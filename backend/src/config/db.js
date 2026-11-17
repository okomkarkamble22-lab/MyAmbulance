// Owns the future MongoDB connection lifecycle.
import mongoose from 'mongoose';
import environment from './environment.js';

export const connectDatabase = async () => {
  if (!environment.mongoUri) {
    console.warn('MongoDB connection skipped: MONGODB_URI is not configured.');
    return;
  }

  await mongoose.connect(environment.mongoUri);
};
