import { LastConversation, Message } from "@/types/message";
import { create } from "zustand";

type ChatStore = {
    lastConversations:LastConversation[];
    unseenMessages:number;
    conversations: Record<number, Message[]>; // number represent the id of the other person
    addMessages:(userId:number, messages:Message[])=>void;
    addLastConversations:(lastConversations:LastConversation[])=>void;
}

export const useChatStore = create<ChatStore>((set)=>({
    lastConversations:[],
    unseenMessages:0,
    conversations:{},
    // addMessages:(userId:number, messages:Message[])=>set((state)=>({
    //     conversations:{
    //         ...state.conversations,
    //         [userId]:[...state.conversations[userId] || [], ...messages]
    //     }
    // })),
    addMessages:(userId:number, messages:Message[])=>set((state)=>{
        if(messages.length===0)return {};

        const lastMessage = messages[messages.length-1];
        const lastMessageUser = lastMessage.senderId===userId?lastMessage.sender:lastMessage.receiver
        return {
            conversations:{
                ...state.conversations,
                [userId]:[...state.conversations[userId] || [], ...messages]
            },
            lastConversations:[
                {
                    user:lastMessageUser,
                    isRead:false,
                    isSender:lastMessage.senderId===userId,
                    content:lastMessage.content,
                    createdAt:lastMessage.createdAt
                },
                ...state.lastConversations.filter(chat=>chat.user.id!==userId)
            ]
        };
    }),
    addLastConversations:(lastConversation:LastConversation[])=>set((state)=>({
        lastConversations:lastConversation
    }))
}));