import { useAuth } from "@/components/providers/AuthProvider";
import Button from "@/components/ui/button";
import { colors, size } from "@/const/const";
import { Session } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function Index() {

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

  const onLayoutRootView = useCallback(()=>{
    if(appIsReady){
      SplashScreen.hide();

      // we will handle redirection later
      if(session){
        router.push(session.user.role==="OWNER"?"/(owner)/home":"/(student)/home");
        // console.log("here", session);
      }
    }
  }, [appIsReady]);

  if(!appIsReady)
    return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onLayout={onLayoutRootView}
    >
      <View style={{
        display:"flex",
        flexDirection:"column",
        gap:"3rem",
        alignItems:"center",
        padding:size["2xl"],
        width:"100%"
      }}>
        <Text style={{
          color:colors.primaryColor,
          fontSize:size["2xl"],
          fontWeight:"500"
        }}>StudentMap</Text>

        <Text style={{
          color:colors.secondaryColor,
          textAlign:'center'
        }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, cupiditate.
        </Text>

        <Image
          source={require("@/assets/images/female-search-place.png")}
          style={{width:250, height:250}}
        />

        <Button variants="secondary"
          style={{width:"100%"}}
          onPress={()=>router.push("/register")}
        >
          <Text style={{
            color:"white",
            textAlign:'center'
          }}>COMMENCER</Text>
        </Button>

        <View style={{
          display:"flex",
          flexDirection:"row",
          gap:5,
          marginTop:10
        }}>
          <Text style={{color:colors.secondaryColor}}>Vous avez un compte?</Text>
          <Button variants="link" 
            onPress={()=>router.push("/login")}
          >
            <Text style={{color:colors.primaryColor, fontWeight:500}}>Connecter vous</Text>
          </Button>
        </View>

      </View>
    </SafeAreaView>
  );
}
