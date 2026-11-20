import crypto from 'crypto';
import User, { USER_ROLES } from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import environment from '../config/environment.js';
import generateToken from '../utils/generateToken.js';
import emailService from './emailService.js';

const publicRoles = [USER_ROLES.PATIENT, USER_ROLES.DRIVER, USER_ROLES.HOSPITAL];

const safeUser = (user) => user.toSafeObject();

export const register = async ({ name, email, phone, password, role = USER_ROLES.PATIENT }) => {
  const normalizedEmail = email.trim().toLowerCase();
  if (!publicRoles.includes(role)) throw new ApiError(400, 'This role cannot be selected during public registration');
  if (await User.exists({ email: normalizedEmail })) throw new ApiError(409, 'An account with this email already exists');

  const trustedRole = role === USER_ROLES.PATIENT;
  const user = await User.create({
    name,
    email: normalizedEmail,
    phone,
    password,
    role,
    isActive: trustedRole,
    isVerified: trustedRole
  });

  return { user: safeUser(user), token: trustedRole ? generateToken(user) : null, pendingApproval: !trustedRole };
};

export const login = async ({ email, password, accountType = 'USER' }) => {
  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password))) throw new ApiError(401, 'Invalid email or password');
  if (accountType === 'DRIVER' && user.role !== USER_ROLES.DRIVER) throw new ApiError(401, 'This account is not registered as an ambulance driver');
  if (accountType === 'USER' && user.role === USER_ROLES.DRIVER) throw new ApiError(401, 'Use the ambulance driver login');
  if (!user.isActive) throw new ApiError(403, 'This account is pending approval or inactive');
  return { user: safeUser(user), token: generateToken(user) };
};

export const createPasswordReset = async (email) => {
  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+resetPasswordToken +resetPasswordExpires');
  if (!user) return;
  const rawToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  user.resetPasswordExpires = new Date(Date.now() + environment.passwordResetExpiresMs);
  await user.save({ validateBeforeSave: false });
  try { await emailService.sendPasswordResetEmail({ email: user.email, token: rawToken }); } catch (error) { console.error(error); }
  return rawToken;
};

export const resetPassword = async (rawToken, password) => {
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  const user = await User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpires: { $gt: new Date() } }).select('+resetPasswordToken +resetPasswordExpires');
  if (!user) throw new ApiError(400, 'Reset token is invalid or expired');
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return safeUser(user);
};

export default { register, login, createPasswordReset, resetPassword };
