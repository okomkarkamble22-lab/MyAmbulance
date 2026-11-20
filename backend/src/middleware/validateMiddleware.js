import { validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';

const validateMiddleware = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) return next(new ApiError(400, 'Validation failed', errors.array()));
  return next();
};

export default validateMiddleware;
