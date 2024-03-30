"use client"
// SocketProvider.tsx

import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

interface SocketProviderProps {
  children: React.ReactNode;
}

interface SocketContextType {
  socket: SocketIOClient.Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

// const socket = io("http://134.209.155.223:5000");
const socket = io("http://localhost:5000");
// const socket = io('http://192.168.0.102:5000');
// const socket = io('http://192.168.0.103:5000');

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
