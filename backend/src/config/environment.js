// Loads and exposes environment settings for the backend.
import dotenv from 'dotenv';

dotenv.config();

const environment = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cookieName: process.env.AUTH_COOKIE_NAME || 'myambulance_token',
  cookieMaxAgeMs: Number(process.env.AUTH_COOKIE_MAX_AGE_MS) || 7 * 24 * 60 * 60 * 1000,
  passwordResetExpiresMs: Number(process.env.PASSWORD_RESET_EXPIRES_MS) || 10 * 60 * 1000,
  emailFrom: process.env.EMAIL_FROM || '',
  emailServiceUrl: process.env.EMAIL_SERVICE_URL || '',
  emailServiceToken: process.env.EMAIL_SERVICE_TOKEN || ''
};

export default environment;
