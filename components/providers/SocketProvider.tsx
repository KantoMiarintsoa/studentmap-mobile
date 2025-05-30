import { createContext, useContext, useEffect, useRef } from "react";
import { io, Socket } from 'socket.io-client';
import { useAuth } from "./AuthProvider";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({
    socket:null
});

export const useSocket = () => useContext(SocketContext);

const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL;

// centralize all operation here

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const {session} = useAuth();

  useEffect(() => {

    if(!session)return;

    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      extraHeaders:{
        "Authorization":`Bearer ${session.access_token}`
      }
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [session]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};