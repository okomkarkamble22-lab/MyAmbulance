// Starts the HTTP server and prepares database and socket integrations.
import http from 'http';
import app from './app.js';
import environment from './config/environment.js';
import { connectDatabase } from './config/db.js';
import { initializeSocket } from './sockets/socket.js';

const server = http.createServer(app);
initializeSocket(server);

const startServer = async () => {
  try {
    await connectDatabase();
    server.listen(environment.port, () => {
      console.log(`MyAmbulance backend listening on port ${environment.port}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exitCode = 1;
  }
};

startServer();
