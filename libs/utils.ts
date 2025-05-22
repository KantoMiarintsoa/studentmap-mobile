import { Session } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getSession(){
    const session = await AsyncStorage.getItem("session");
    if(!session)return null;
    return JSON.parse(session) as Session;
}