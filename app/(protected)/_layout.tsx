import { useAuth } from '@/components/providers/AuthProvider';
import { SocketProvider } from '@/components/providers/SocketProvider';
import { Session } from '@/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

const ProtectedLayout = () => {

  const [appIsReady, setAppIsReady] = useState(false);
  const router = useRouter();
  const {session, updateSession}=useAuth();
    
  useEffect(()=>{
    async function prepare(){
      try{
          const sessionStored = await AsyncStorage.getItem("session");
          if(sessionStored){
          updateSession(JSON.parse(sessionStored) as Session);
          }
          // wait 2s
          await new Promise(resolve=>setTimeout(resolve, 2000));
      }
      catch(e){
          console.warn(e);
      }
      finally{
          setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(()=>{
    if(!appIsReady)return;

    if(session){
      router.push(session.user.role==="OWNER"?"/(protected)/(owner)":"/(protected)/(student)");
    }
    else{
      router.push("/(auth)/home");
    }
  }, [appIsReady]);

  if(!appIsReady)
    return null;
    
  return (
    <SocketProvider>
      <Stack>
          <Stack.Screen name='(owner)' options={{
              headerShown:false
          }}/>
          <Stack.Screen name='(student)' options={{
              headerShown:false
          }}/>
          <Stack.Screen name='(message)' options={{
            headerShown:false
          }}/>
      </Stack>
    </SocketProvider>
  )
}

export default ProtectedLayout