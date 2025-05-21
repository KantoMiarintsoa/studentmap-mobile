import { LoginSchema, RegisterSchema } from "@/schema/auth";
import { Session, User } from "@/types/user";
import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const axiosInstance = axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
});

axiosInstance.interceptors.request.use(async config=>{

    // process token here

    return config;
});

export const login = async (data:LoginSchema)=>{
    return (await axiosInstance.post<Session>('auth/login', data)).data;
}

export const register = async (data:RegisterSchema)=>{
    return (await axiosInstance.post<User>('users/register', data)).data;
}