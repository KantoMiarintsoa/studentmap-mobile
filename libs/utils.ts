import { Session } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getSession(){
    const session = await AsyncStorage.getItem("session");
    if(!session)return null;
    return JSON.parse(session) as Session;
}

export function normalizeUrl(url:string){
    if(!url.startsWith("http")){
        return `${process.env.EXPO_PUBLIC_API_URL}/storage/preview/${url}`;
    }
    return url;
}