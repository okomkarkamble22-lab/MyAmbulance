import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import environment from '../config/environment.js';
import ApiError from '../utils/ApiError.js';

const getToken = (request) => {
  const cookieHeader = request.headers.cookie || '';
  const cookies = Object.fromEntries(cookieHeader.split(';').filter(Boolean).map((part) => {
    const index = part.indexOf('=');
    return [part.slice(0, index).trim(), decodeURIComponent(part.slice(index + 1).trim())];
  }));
  if (cookies[environment.cookieName]) return cookies[environment.cookieName];
  if (request.headers.authorization?.startsWith('Bearer ')) return request.headers.authorization.slice(7);
  return null;
};

const authMiddleware = async (request, response, next) => {
  try {
    if (!environment.jwtSecret) throw new ApiError(500, 'Authentication is not configured');
    const token = getToken(request);
    if (!token) throw new ApiError(401, 'Authentication required');
    const payload = jwt.verify(token, environment.jwtSecret);
    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) throw new ApiError(401, 'Account is unavailable');
    if (user.passwordChangedAt && payload.iat * 1000 < user.passwordChangedAt.getTime()) {
      throw new ApiError(401, 'Session expired; please sign in again');
    }
    request.user = user;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      return next(new ApiError(401, 'Invalid or expired authentication'));
    }
    return next(error);
  }
};

export default authMiddleware;
