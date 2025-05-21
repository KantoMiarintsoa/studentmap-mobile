import { Session } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useState } from "react";

type AuthProviderProps = {
    session?:Session,
    updateSession:(session?:Session)=>Promise<void> | void
}

const AuthContext = createContext<AuthProviderProps>({
    session:undefined,
    updateSession:()=>{}
})

export function AuthProvider({children, initialSession}:{children:ReactNode, initialSession?:Session}){

    const [session, setSession] = useState<Session | undefined>(initialSession);

    const updateSession =  async (session?:Session)=>{
        if(!session){
            await AsyncStorage.removeItem("session");
        }
        else{
            await AsyncStorage.setItem("session", JSON.stringify(session));
        }

        setSession(session);
    }

    return (
        <AuthContext.Provider value={{
            session,
            updateSession
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}