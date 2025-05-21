import Button from "@/components/ui/button";
import { colors, size } from "@/const";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
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
