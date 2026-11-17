// Defines CORS settings shared by the Express app and Socket.IO server.
import environment from './environment.js';

const corsOptions = {
  origin: environment.clientUrl,
  credentials: true
};

export default corsOptions;
