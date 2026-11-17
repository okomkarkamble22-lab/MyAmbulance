// Creates the Socket.IO client; connection remains lazy until a feature needs it.
import { io } from 'socket.io-client';
import environment from '../config/environment.js';

const socket = io(environment.socketUrl, { autoConnect: false });

export default socket;
