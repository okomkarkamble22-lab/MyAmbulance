import authService from '../services/authService.js';
import ApiResponse from '../utils/ApiResponse.js';
import environment from '../config/environment.js';

const cookieOptions = () => [
  `${environment.cookieName}=`,
  'Path=/',
  'HttpOnly',
  'SameSite=Lax',
  'Max-Age=0',
  environment.nodeEnv === 'production' ? 'Secure' : ''
].filter(Boolean).join('; ');

const setAuthCookie = (response, token) => response.setHeader('Set-Cookie', [
  `${environment.cookieName}=${encodeURIComponent(token)}`,
  'Path=/',
  'HttpOnly',
  'SameSite=Lax',
  `Max-Age=${Math.floor(environment.cookieMaxAgeMs / 1000)}`,
  environment.nodeEnv === 'production' ? 'Secure' : ''
].filter(Boolean).join('; '));

export const register = async (request, response) => {
  const result = await authService.register(request.body);
  if (result.token) setAuthCookie(response, result.token);
  return response.status(201).json(new ApiResponse({ user: result.user, pendingApproval: result.pendingApproval }, result.pendingApproval ? 'Registration submitted for approval' : 'Registration successful'));
};

export const login = async (request, response) => {
  const result = await authService.login(request.body);
  setAuthCookie(response, result.token);
  return response.json(new ApiResponse({ user: result.user }, 'Login successful'));
};

export const logout = async (request, response) => {
  response.setHeader('Set-Cookie', cookieOptions());
  return response.json(new ApiResponse(null, 'Logout successful'));
};

export const me = async (request, response) => response.json(new ApiResponse({ user: request.user }));

export const forgotPassword = async (request, response) => {
  await authService.createPasswordReset(request.body.email);
  return response.json(new ApiResponse(null, 'If an account exists, password reset instructions will be sent'));
};

export const resetPassword = async (request, response) => {
  const user = await authService.resetPassword(request.body.token, request.body.password);
  return response.json(new ApiResponse({ user }, 'Password reset successful'));
};

export default { register, login, logout, me, forgotPassword, resetPassword };
