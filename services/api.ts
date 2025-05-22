import { getSession } from "@/libs/utils";
import { LoginSchema, RegisterSchema } from "@/schema/auth";
import { UpdateUserSchema } from "@/schema/user";
import { Session, User } from "@/types/user";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const PUBLIC_URL = [
    "auth/login",
    "users/register"
];

const axiosInstance = axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
});

axiosInstance.interceptors.request.use(async config=>{

    // process token here
    if(!PUBLIC_URL.includes(config.url??"")){
        const session = await getSession();
        if(session){
            config.headers.Authorization=`Bearer ${session.access_token}`;
        }
    }

    return config;
});

export const login = async (data:LoginSchema)=>{
    return (await axiosInstance.post<Session>('auth/login', data)).data;
}

export const register = async (data:RegisterSchema)=>{
    return (await axiosInstance.post<User>('users/register', data)).data;
}

export const updateUser = async (id:number, data:UpdateUserSchema)=>{

    const formData = new FormData();
    if(data.firstName){
        formData.append("firstName", data.firstName);
    }
    if(data.lastName){
        formData.append("lastName", data.lastName);
    }
    if(data.contact){
        formData.append("contact", data.contact);
    }

    return (await axiosInstance.put<User>(`users/${id}/update`, formData)).data;
}