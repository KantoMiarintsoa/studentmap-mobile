import Button, { GoBackButton } from '@/components/ui/button'
import { Input, PasswordInput } from '@/components/ui/input'
import { colors, size } from '@/const'
import { loginSchema, LoginSchema } from '@/schema/auth'
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { Controller, useForm } from "react-hook-form"
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = () => {

    const {
        formState:{errors, isSubmitting}
        ,...form
    } = useForm<LoginSchema>({
        resolver:zodResolver(loginSchema)
    });

    const handleLogin = async(data:LoginSchema)=>{
        console.log(data);
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
                <Text style={{fontSize:size.xl, color:colors.primaryColor, fontWeight:500}}>Bienvenue sur StudentMap</Text>
                <Text style={{color:colors.secondaryColor, textAlign:'center'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, expedita!</Text>

                <Controller
                    name='email'
                    control={form.control}
                    render={({field:{onChange, onBlur, value}})=>(
                        <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                            <Text style={[{
                                color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                            }, errors.email && style.textError]}>
                                {errors.email ? "Email* invalide":"Email*"}
                            </Text>
                            <Input
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                            {(errors.root) && <Text style={style.textError}>Email ou mot de passe incorrect</Text>}
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
                                {errors.password ? "Mot de passe* invalide":"Mot de passe*"}
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
                >
                    {isSubmitting && (
                        <ActivityIndicator size={"small"} color={"#fff"}/>
                    )}
                    <Text style={{color:"#fff", width:"100%", textAlign:"center"}}>Connecter</Text>
                </Button>

                {/* separator */}

                <View style={{marginVertical:10, display:'flex', flexDirection:"row", gap:10, width:"100%", alignItems:"center"}}>
                    <View style={{height:2, backgroundColor:colors.lightGray, flex:1}}/>
                    <Text style={{color:colors.secondaryColor}}>Ou</Text>
                    <View style={{height:2, backgroundColor:colors.lightGray, flex:1}}/>
                </View>

                <Button variants='outline' style={{width:"100%", gap:10}}>
                    <Image
                        source={require("@/assets/icons/google.png")}
                        style={{width:25, height:25}}
                    />
                    <Text>Connecter avec google</Text>
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