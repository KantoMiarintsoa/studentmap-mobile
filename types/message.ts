import { User } from "./user";

export type MessageType = "TEXT" | "VIDEO" | "IMAGE" | "FILE" | "AUDIO";

export type Message = {
    id:number;
    senderId:number;
    receiverId:number;
    content:string;
    messageType:MessageType;
    sender:User;
    receiver:User;
    createdAt:string;
    isRead:boolean;
}

export type LastConversation = {
    user:User; 
    content:string; 
    isSender:boolean; 
    isRead:boolean;
    createdAt:string;
}