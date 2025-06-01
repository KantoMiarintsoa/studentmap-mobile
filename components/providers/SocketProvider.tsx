import { useChatStore, useMeStore } from "@/store/store";
import { Message } from "@/types/message";
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
  const {addMessages} = useChatStore();
  const {details} = useMeStore();

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

    // centralize every socket operation here
    // listen to new message
    socket.on("newMessage", (newMessage:Message)=>{
      // get the other user
      const userId = details.id===newMessage.senderId?newMessage.receiverId:newMessage.senderId;
      console.log('called');
      addMessages(userId, [newMessage]);
    })

    return () => {
      socket.disconnect();
    };
  }, [session, details]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};