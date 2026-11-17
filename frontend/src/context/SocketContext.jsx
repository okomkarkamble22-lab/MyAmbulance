// Makes the shared Socket.IO client available to future features.
import { createContext, useContext } from 'react';
import socket from '../services/socket.js';

const SocketContext = createContext(socket);

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export const useSocket = () => useContext(SocketContext);
