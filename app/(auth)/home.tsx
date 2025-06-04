import Button from '@/components/ui/button'
import { colors, size } from '@/const/const'
import { useRouter } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, SafeAreaView, Text, View } from 'react-native'

const Home = () => {

  const router = useRouter();

  const {t} = useTranslation();

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
          {t("global.description")}
        </Text>

        <Image
          source={require("@/assets/images/female-search-place.png")}
          style={{width:250, height:250}}
        />

        <Button variants="primary"
          style={{width:"100%"}}
          onPress={()=>router.push("/register")}
        >
          <Text style={{
            color:"white",
            textAlign:'center'
          }}>{t("global.start")}</Text>
        </Button>

        <View style={{
          display:"flex",
          flexDirection:"row",
          gap:5,
          marginTop:10
        }}>
          <Text style={{color:colors.secondaryColor}}>{t("register.haveAccount")}</Text>
          <Button variants="link" 
            onPress={()=>router.push("/login")}
          >
            <Text style={{color:colors.primaryColor, fontWeight:500}}>{t("register.connect")}</Text>
          </Button>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Home