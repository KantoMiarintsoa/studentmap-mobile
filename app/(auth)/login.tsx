import { useAuth } from '@/components/providers/AuthProvider'
import Button, { GoBackButton } from '@/components/ui/button'
import { Input, PasswordInput } from '@/components/ui/input'
import { ALLOWED_ROLE, colors, size } from '@/const/const'
import { normalizeUrl } from '@/libs/utils'
import { loginSchema, LoginSchema } from '@/schema/auth'
import { login } from '@/services/api'
import { useMeStore } from '@/store/store'
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from 'axios'
import { useRouter } from 'expo-router'
import React from 'react'
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = () => {

    const {
        formState:{errors, isSubmitting}
        ,...form
    } = useForm<LoginSchema>({
        resolver:zodResolver(loginSchema)
    });

    const {t} = useTranslation();

    const router = useRouter();

    const {updateSession} = useAuth();
    const {setDetails} = useMeStore();

    const handleLogin = async(data:LoginSchema)=>{
        try{
            const response = await login(data);

            if(!ALLOWED_ROLE.includes(response.user.role)){
                // show dialog
                return;
            }

            // transform profile picture
            if(response.user.profilePicture){
                response.user.profilePicture = normalizeUrl(response.user.profilePicture);
            }

            await updateSession(response);
            setDetails(response.user);
            // redirect
            router.push(
                response.user.role==="STUDENT"?"/(protected)/(student)/(home)":"/(protected)/(owner)"
            );
        }
        catch(error){
            const axiosError = error as AxiosError;
            if(axiosError.status===500){
                // dialog
                Alert.alert("Error", t("global.handlingError"), [
                    {
                        text:"OK",
                        style:"default"
                    }
                ]);
                return;
            }

            // no corresponding user
            form.setError("root", {message:"no user found"});
        }
    }

  return (
    <SafeAreaView style={{flex:1}}>
        <View style={{
            padding:20,
            display:"flex",
            flexDirection:"column",
            flex:1
        }}>
            <GoBackButton/>

            <View style={{
                flex:1,
                gap:10,
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                marginTop:40,
                paddingHorizontal:20
            }}>
                <Text style={{fontSize:size.xl, color:colors.primaryColor, fontWeight:500}}>{t("login.welcome")}</Text>
                <Text style={{color:colors.secondaryColor, textAlign:'center'}}>{t("login.description")}</Text>

                <Controller
                    name='email'
                    control={form.control}
                    render={({field:{onChange, onBlur, value}})=>(
                        <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                            <Text style={[{
                                color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                            }, errors.email && style.textError]}>
                                {errors.email ? t("login.invalidEmail"):t("login.email")}
                            </Text>
                            <Input
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                keyboardType='email-address'
                            />
                            {(errors.root) && <Text style={style.textError}>{t("login.credentialsInvalid")}</Text>}
                        </View>
                    )}
                />

                <Controller
                    name='password'
                    control={form.control}
                    render={({field:{onChange, onBlur, value}})=>(
                        <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                            <Text style={[
                                {color:colors.secondaryColor, fontWeight:500, fontSize:size.md},
                                errors.password && style.textError
                            ]}>
                                {errors.password ? t("login.passwordInvalid"):t("login.password")}
                            </Text>
                            <PasswordInput
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        </View>
                    )}
                />

                <Button
                    onPress={form.handleSubmit(handleLogin)}
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
                    <Text style={{color:colors.secondaryColor}}>{t("login.noAccount")}</Text>
                    <Button variants="link" 
                        onPress={()=>router.push("/register")}
                    >
                        <Text style={{color:colors.primaryColor, fontWeight:500}}>{t("login.register")}</Text>
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
        </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const style = StyleSheet.create({
    textError:{
        color:"red"
    }
});