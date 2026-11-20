import { body } from 'express-validator';

const email = body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail();
const password = body('password').isString().isLength({ min: 8, max: 128 }).withMessage('Password must be 8 to 128 characters');

export const registerValidator = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2 to 100 characters'),
  email,
  body('phone').optional({ values: 'falsy' }).trim().isLength({ max: 20 }).withMessage('Phone is too long'),
  password,
  body('role').optional().isIn(['PATIENT', 'DRIVER', 'HOSPITAL']).withMessage('Invalid registration role')
];

export const loginValidator = [
  email,
  body('password').isString().notEmpty().withMessage('Password is required'),
  body('accountType').optional().isIn(['USER', 'DRIVER']).withMessage('Invalid account type')
];
export const forgotPasswordValidator = [email];
export const resetPasswordValidator = [body('token').trim().notEmpty().withMessage('Reset token is required'), password];

export default { registerValidator, loginValidator, forgotPasswordValidator, resetPasswordValidator };
