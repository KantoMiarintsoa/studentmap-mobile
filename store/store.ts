import { Accomodation } from "@/types/accomodation";
import { LastConversation, Message } from "@/types/message";
import { University } from "@/types/university";
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
    addUsers:(users:User[])=>void,
    //record last message state
    lastMessageState:Record<number, number>;
    setLastMessagesState:(userId:number, messageId:number)=>void,
    viewMessage:(userId:number, messageId:number)=>void,
    unreadMessages:number,
    setUnreadMessage:(unreadMessages:number)=>void
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
            ],
            lastMessageState:{
                ...state.lastMessageState,
                [userId]:messages[0].id
            }
        };
    }),
    addLastConversations:(lastConversation:LastConversation[])=>set(()=>({
        lastConversations:lastConversation
    })),
    users:[],
    addUsers:(users:User[])=>set((state)=>({
        users:[...state.users, ...users]
    })),
    lastMessageState:{},
    setLastMessagesState:(userId:number, messageId:number)=>set((state)=>({
        lastMessageState:{
            ...state.lastMessageState,
            [userId]:messageId
        }
    })),
    viewMessage:(userId:number, messageId:number)=>set((state)=>{
        const lastConversations = state.lastConversations.map(c=>c.user.id===userId ? ({
            ...c,
            isRead:true
        }):c);
        const conversations = state.conversations[userId].map(
            message=>message.id===messageId?({...message, isRead:true}):message
        )
        return {
            lastConversations,
            conversations:{
                ...state.conversations,
                [userId]:conversations
            }
        }
    }),
    // set to negative to indicate the need to fetch
    unreadMessages:-1,
    setUnreadMessage:(unreadMessages:number)=>set(()=>({
        unreadMessages
    }))
}));

type AccomodationStore = {
    accomodations:Accomodation[];
    addAccomodations:(accomodations:Accomodation[])=>void;
    setAccomodations:(accomodations:Accomodation[])=>void;
}

export const useAccomodationStore = create<AccomodationStore>((set)=>({
    accomodations:[],
    addAccomodations:(accomodations:Accomodation[])=>set((state)=>({
        accomodations:[
            ...state.accomodations,
            ...accomodations
        ]
    })),
    setAccomodations:(accomodations:Accomodation[])=>set(()=>({
        accomodations
    }))
}));

type SelectUniversityStore = {
    university?:University;
    setUniversity:(university?:University)=>void;
}

export const useSelectUniversityStore = create<SelectUniversityStore>((set)=>({
    university:undefined,
    setUniversity:(university?:University)=>set(()=>({
        university
    }))
}));

type OwnerAccomodationStore = {
    accomodations:Accomodation[];
    addAccomodations:(accomodations:Accomodation[])=>void;
    setAccomodations:(accomodations:Accomodation[])=>void;
}

export const useOwnerAccomodationStore = create<OwnerAccomodationStore>((set)=>({
    accomodations:[],
    addAccomodations:(accomodations:Accomodation[])=>set((state)=>({
        accomodations:[...accomodations, ...state.accomodations]
    })),
    setAccomodations:(accomodations:Accomodation[])=>set(()=>({
        accomodations
    }))
}))