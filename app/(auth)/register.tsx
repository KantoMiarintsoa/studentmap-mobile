import { useAuth } from '@/components/providers/AuthProvider'
import Button, { GoBackButton } from '@/components/ui/button'
import { Input, PasswordInput } from '@/components/ui/input'
import { colors, size } from '@/const/const'
import { registerSchema, RegisterSchema } from '@/schema/auth'
import { login, register } from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const RegisterScreen = () => {
  
  const {
    formState:{errors, isSubmitting},
    ...form
  }=useForm<RegisterSchema>({
    resolver:zodResolver(registerSchema),
    defaultValues:{
      role:"STUDENT"
    }
  });

  const router = useRouter();

  const {updateSession} = useAuth();

  const {t} = useTranslation();

  const handleRegister = async (data:RegisterSchema)=>{
    try{
      await register(data);
      // login if success
      const loginResponse = await login({email:data.email, password:data.password});
      await updateSession(loginResponse);
      // redirect
      router.push(
          loginResponse.user.role==="STUDENT"?"/(protected)/(student)/(home)":"/(protected)/(owner)"
      );
    }
    catch(error){
      const axiosError = error as AxiosError;
      const data = axiosError.response?.data as {message:string}|undefined
      if(data?.message.includes("email")){
        form.setError("email", {message:"Cet email est deja pris"});
      }
    }
  }

  return (
    <SafeAreaView style={{
      flex:1
    }}>
      <View style={
        {
            padding:20,
            display:"flex",
            flexDirection:"column",
            flex:1
        }
      }>
        <GoBackButton/>
        <KeyboardAvoidingView 
          behavior={Platform.OS==="ios" ?"padding":"height"}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30} 
          style={{
            flex:1
        }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{
              gap:10,
              display:"flex",
              flexDirection:"column",
              alignItems:"center",
              marginTop:40,
              paddingHorizontal:20,
              paddingBottom:20
            }}>
              <Text style={{fontSize:size.xl, color:colors.primaryColor, fontWeight:500}}>{t("register.welcome")}</Text>
              <Text style={{color:colors.secondaryColor, textAlign:'center'}}>{t("register.description")}</Text>

              {/* inputs */}
              <Controller
                name='email'
                control={form.control}
                render={({field:{onChange, onBlur, value}})=>(
                  <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                    <Text style={[{
                        color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                    }, errors.email && style.textError]}>
                        {errors.email ? `${t("profile.email")} ${errors.email.message}`:t("profile.email")}
                    </Text>
                    <Input
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        keyboardType='email-address'
                    />
                    {(errors.root) && <Text style={style.textError}>{t("register.emailIncorrect")}</Text>}
                  </View>
                  )}
                />

              <Controller
                name='firstName'
                control={form.control}
                render={({field:{onChange, onBlur, value}})=>(
                  <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                    <Text style={[{
                        color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                    }, errors.firstName && style.textError]}>
                        {t("profile.firstname")}
                    </Text>
                    <Input
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                  </View>
                  )}
                />
                <Controller
                  name='lastName'
                  control={form.control}
                  render={({field:{onChange, onBlur, value}})=>(
                    <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                      <Text style={[{
                          color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                      }, errors.lastName && style.textError]}>
                          {t("profile.lastname")}
                      </Text>
                      <Input
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                      />
                    </View>
                    )}
                  />
                  <Controller
                    name='contact'
                    control={form.control}
                    render={({field:{onChange, onBlur, value}})=>(
                      <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                        <Text style={[{
                            color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                        }, errors.contact && style.textError]}>
                            {t("profile.contact")}
                        </Text>
                        <Input
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder='ex: +261 33 765 21'
                        />
                      </View>
                    )}
                  />
                  <Controller
                    name='password'
                    control={form.control}
                    render={({field:{onChange, onBlur, value}})=>(
                      <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                        <Text style={[{
                            color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                        }, errors.password && style.textError]}>
                            {t("profile.password")}
                        </Text>
                        <PasswordInput
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                      </View>
                    )}
                  />
                  <Controller
                    name='confirmPassword'
                    control={form.control}
                    render={({field:{onChange, onBlur, value}})=>(
                      <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                        <Text style={[{
                            color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                        }, errors.confirmPassword && style.textError]}>
                            {errors.confirmPassword?t("register.passwordNotMatch"):t("security.confirmPassword")}
                        </Text>
                        <PasswordInput
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                      </View>
                    )}
                  />

                  <Controller
                    name='role'
                    control={form.control}
                    render={({field:{value}})=>(
                      <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                        <Text style={[{
                            color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                        }, errors.role && style.textError]}>Je suis*</Text>
                        <View style={{width:"100%", display:"flex", flexDirection:"row", gap:10}}>
                          <Button
                            onPress={()=>form.setValue("role", "STUDENT")}
                            variants={value==="STUDENT"?"secondary":"outline"}
                            style={{flex:1}}
                          >
                            <Text style={{color:value==="STUDENT"?"#fff":colors.secondaryColor}}>{t("register.student")}</Text>
                          </Button>
                          <Button
                            onPress={()=>form.setValue("role", "OWNER")}
                            variants={value==="OWNER"?"secondary":"outline"}
                            style={{flex:1}}
                          >
                            <Text style={{color:value==="OWNER"?"#fff":colors.secondaryColor}}>{t("register.owner")}</Text>
                          </Button>
                        </View>
                      </View>
                    )}
                  />

                  {/* buttons */}
                <Button
                  onPress={form.handleSubmit(handleRegister)}
                  style={{width:"100%"}}
                >
                  {isSubmitting && (
                      <ActivityIndicator size={"small"} color={"#fff"}/>
                  )}
                  <Text style={{color:"#fff", textAlign:"center"}}>{t("login.logIn")}</Text>
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

                {/* separator */}

                <View style={{marginVertical:10, display:'flex', flexDirection:"row", gap:10, width:"100%", alignItems:"center"}}>
                    <View style={{height:2, backgroundColor:colors.lightGray, flex:1}}/>
                    <Text style={{color:colors.secondaryColor}}>{t("global.or")}</Text>
                    <View style={{height:2, backgroundColor:colors.lightGray, flex:1}}/>
                </View>

                <Button variants='outline' style={{width:"100%", gap:10}}>
                    <Image
                        source={require("@/assets/icons/google.png")}
                        style={{width:25, height:25}}
                    />
                    <Text>{t("global.withGoogle")}</Text>
                </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen

const style = StyleSheet.create({
    textError:{
        color:"red"
    }
});