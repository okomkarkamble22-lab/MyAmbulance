import { Router } from 'express';
import authController from '../controllers/authController.js';
import { forgotPasswordValidator, loginValidator, registerValidator, resetPasswordValidator } from '../validators/authValidator.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import asyncHandler from '../utils/asyncHandler.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();
router.post('/register', registerValidator, validateMiddleware, asyncHandler(authController.register));
router.post('/login', loginValidator, validateMiddleware, asyncHandler(authController.login));
router.post('/logout', asyncHandler(authController.logout));
router.get('/me', authMiddleware, asyncHandler(authController.me));
router.post('/forgot-password', forgotPasswordValidator, validateMiddleware, asyncHandler(authController.forgotPassword));
router.post('/reset-password', resetPasswordValidator, validateMiddleware, asyncHandler(authController.resetPassword));

export default router;
