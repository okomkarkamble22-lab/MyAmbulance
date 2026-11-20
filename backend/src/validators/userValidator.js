import { body } from 'express-validator';

export const profileValidator = [
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2 to 100 characters'),
  body('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone is too long'),
  body('profileImage').optional().isURL().withMessage('Profile image must be a valid URL')
];

export default profileValidator;
