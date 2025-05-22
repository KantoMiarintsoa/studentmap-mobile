import { getSession } from "@/libs/utils";
import { LoginSchema, RegisterSchema } from "@/schema/auth";
import { UpdatePasswordSchema, UpdateUserSchema } from "@/schema/user";
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
    },
    timeout:20000
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

export const updateUser = async (id:number, data:UpdateUserSchema, imageUri?:string)=>{

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
    if(imageUri){
        console.log("image", imageUri);
        // Fetch the image and convert it to a Blob
        const filename = imageUri.split('/').pop();
        const type = `image/${filename?.split('.').pop()}`;
        console.log(filename, type);
        formData.append("profilePicture", {
            uri:imageUri,
            name: filename,
            type,
        } as any);
        // const file = await fetch(imageUri);
        // const image = await file.blob();
        // formData.append("profilePicture", image);
    }

    return (await axiosInstance.put<User>(`users/${id}/update`, formData, {
        headers:{
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    })).data;
}

export const updatePassword = async (id:number, data:UpdatePasswordSchema)=>{
    return (await axiosInstance.put<User>(`users/${id}/update`, {
        oldPassword:data.oldPassword,
        password:data.newPassword
    })).data;
}