import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import userController from '../controllers/userController.js';
import profileValidator from '../validators/userValidator.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = Router();
router.use(authMiddleware);
router.get('/me', asyncHandler(userController.getProfile));
router.patch('/me', profileValidator, validateMiddleware, asyncHandler(userController.updateProfile));

export default router;
