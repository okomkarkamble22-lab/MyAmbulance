// Loads and exposes environment settings for the backend.
import dotenv from 'dotenv';

dotenv.config();

const environment = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000'
};

export default environment;
