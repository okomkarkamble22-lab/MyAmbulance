import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export const USER_ROLES = Object.freeze({
  PATIENT: 'PATIENT',
  DRIVER: 'DRIVER',
  ADMIN: 'ADMIN',
  HOSPITAL: 'HOSPITAL'
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: { type: String, trim: true, maxlength: 20 },
  password: { type: String, required: true, minlength: 8, select: false },
  role: { type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.PATIENT, required: true },
  profileImage: { type: String, trim: true },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  passwordChangedAt: Date,
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpires: { type: Date, select: false }
}, { timestamps: true });

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  if (!this.isNew) this.passwordChangedAt = new Date(Date.now() - 1000);
  return next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toSafeObject = function toSafeObject() {
  const value = this.toObject ? this.toObject() : { ...this };
  delete value.password;
  delete value.resetPasswordToken;
  delete value.resetPasswordExpires;
  return value;
};

export default mongoose.model('User', userSchema);
