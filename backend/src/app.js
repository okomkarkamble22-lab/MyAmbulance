// Creates and configures the Express application.
import express from 'express';
import cors from 'cors';
import corsOptions from './config/cors.js';
import apiRateLimiter from './middleware/rateLimitMiddleware.js';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRateLimiter);
app.get('/health', (request, response) => {
  void request;
  response.status(200).json({ status: 'ok' });
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
