import jwt from 'jsonwebtoken';
import environment from '../config/environment.js';

const generateToken = (user) => {
  if (!environment.jwtSecret) {
    throw new Error('JWT_SECRET is not configured');
  }

  return jwt.sign({ sub: user._id.toString() }, environment.jwtSecret, {
    expiresIn: environment.jwtExpiresIn
  });
};

export default generateToken;
