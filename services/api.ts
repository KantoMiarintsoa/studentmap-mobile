import { getSession } from "@/libs/utils";
import { AddAccomodationSchema } from "@/schema/accomodation";
import { LoginSchema, RegisterSchema } from "@/schema/auth";
import { ConfirmPaymentSchema } from "@/schema/payment";
import { SearchUniversitySchema } from "@/schema/search";
import { UpdatePasswordSchema, UpdateUserSchema } from "@/schema/user";
import { Accomodation } from "@/types/accomodation";
import { Message } from "@/types/message";
import { University } from "@/types/university";
import { PaymentMethod, Session, User } from "@/types/user";
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

export const getMe = async ()=>{
    return (await axiosInstance.get<User>('users/me')).data;
}

// accomodation
export const addAccomodation = async (data:AddAccomodationSchema, images:string[])=>{
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("area", data.area.toString());
    formData.append("receptionCapacity", data.receptionCapacity);
    formData.append("rentMin", data.rentMin.toString());
    formData.append("rentMax", data.rentMax.toString());
    formData.append("type", data.type);
    formData.append("city", data.city);

    for(const imageUri of images){
        const filename = imageUri.split('/').pop();
        const type = `image/${filename?.split('.').pop()}`;
        console.log(filename, type);
        formData.append("media", {
            uri:imageUri,
            name: filename,
            type,
        } as any);
    }

    return (await axiosInstance.post<Accomodation&{serviceRemainders:number}>(`accommodation/add`, formData, {
        headers:{
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    })).data;    
}

export const getOwnerAccomodation = async ()=>{
    return (await axiosInstance.get<Accomodation[]>(`accommodation/owner`)).data;
}

// payment
export const setupIntentApi = async ()=>{
    return (await axiosInstance.post<{clientSecret:string}>('users/payment/setup-intent', {})).data;
}

export const listPaymentMethods = async()=>{
    return (await axiosInstance.get<PaymentMethod[]>('users/payment/payment-methods')).data;
}

export const removePaymentMethod = async (id:string)=>{
    return (await axiosInstance.delete<{message:string}>(`users/payment/payment-methods/${id}`)).data;
}

export const buyCredits = async (data:ConfirmPaymentSchema)=>{
    return (await axiosInstance.post<{credits:number}>('users/payment/buy-credits', data)).data;
}

// chat feature
export const getLastConversation = async ()=>{
    return (await axiosInstance.get<Message[]>('messages/last-users-messages')).data;
}

export const getUserDetails = async (id:number)=>{
    return (await axiosInstance.get<User>(`users/${id}/details`)).data;
}

export const getConversation = async(userId:number)=>{
    return (await axiosInstance.get<Message[]>(`messages/get/${userId}`)).data;
}

export const getUnreadMessages = async()=>{
    return (await axiosInstance.get<{count:number}>('messages/unread')).data;
}

export const getUsersByFirstName = async (firstName:string)=>{
    return (await axiosInstance.get<User[]>(`users/search?firstName=${firstName}`)).data;
}

// for home screen student
export const getAccomodationSuggestion = async ()=>{
    return (await axiosInstance.get<Accomodation[]>('accommodation/lists')).data;
}

export const getUniversitySuggestion = async ()=>{
    return (await axiosInstance.get<University[]>('university/lists')).data;
}

export const getAccomodationDetails = async (id:number)=>{
    return (await axiosInstance.get<Accomodation>(`accommodation/${id}/details`)).data;
}

export const getFilteredUniversity = async (params:SearchUniversitySchema)=>{
    const url = new URLSearchParams(params);
    return (await axiosInstance.get<University[]>(`university/filter?${url.toString()}`)).data;
}

export const getFilteredAccommodations = async (params:{
      nameUniversity?:string,
      address?:string,
      budget?:string,
      type?:string
  })=>{
    const url = new URLSearchParams(params);
    return (await axiosInstance.get<Accomodation[]>(`accommodation/advanced-search?${url.toString()}`)).data;
  }

export const reviewAccommodation = async (id:number, rating:number)=>{
    return (await axiosInstance.put<Accomodation>(`accommodation/${id}/review`, {
        rating
    })).data;
}