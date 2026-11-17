// Initializes Socket.IO and leaves event registration for future phases.
import { Server } from 'socket.io';
import corsOptions from '../config/cors.js';

export const initializeSocket = (httpServer) => new Server(httpServer, { cors: corsOptions });
