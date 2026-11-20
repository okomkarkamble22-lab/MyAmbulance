import ApiError from '../utils/ApiError.js';

const roleMiddleware = (...roles) => (request, response, next) => {
  if (!request.user) return next(new ApiError(401, 'Authentication required'));
  if (!roles.includes(request.user.role)) return next(new ApiError(403, 'Insufficient permissions'));
  return next();
};

export default roleMiddleware;
