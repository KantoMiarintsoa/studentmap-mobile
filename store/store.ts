import { LastConversation, Message } from "@/types/message";
import { User } from "@/types/user";
import { create } from "zustand";

type MeStore = {
    details:User,
    setDetails:(user:User)=>void
}

export const useMeStore = create<MeStore>((set)=>({
    details:{
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        role: "STUDENT",
        contact: "",
        serviceRemainders: 0
    },
    setDetails:(user:User)=>set(()=>({
        details:user
    }))
}))

type ChatStore = {
    lastConversations:LastConversation[];
    unseenMessages:number;
    conversations: Record<number, Message[]>; // number represent the id of the other person
    addMessages:(userId:number, messages:Message[])=>void;
    addLastConversations:(lastConversations:LastConversation[])=>void;
    // to avoid refetch
    users:User[],
    addUsers:(users:User[])=>void
}

export const useChatStore = create<ChatStore>((set)=>({
    lastConversations:[],
    unseenMessages:0,
    conversations:{},
    addMessages:(userId:number, messages:Message[])=>set((state)=>{
        if(messages.length===0)return {};

        const lastMessage = messages[messages.length-1];
        const lastMessageUser = lastMessage.senderId===userId?lastMessage.sender:lastMessage.receiver;

        return {
            conversations:{
                ...state.conversations,
                [userId]:[...messages, ...state.conversations[userId] || []]
            },
            lastConversations:[
                {
                    user:lastMessageUser,
                    isRead:false,
                    isSender:lastMessage.senderId!==userId,
                    content:lastMessage.content,
                    createdAt:lastMessage.createdAt
                },
                ...state.lastConversations.filter(chat=>chat.user.id!==userId)
            ]
        };
    }),
    addLastConversations:(lastConversation:LastConversation[])=>set((state)=>({
        lastConversations:lastConversation
    })),
    users:[],
    addUsers:(users:User[])=>set((state)=>({
        users:[...state.users, ...users]
    }))
}));