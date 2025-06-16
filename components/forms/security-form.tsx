import { colors, size } from '@/const/const'
import { updatePasswordSchema, UpdatePasswordSchema } from '@/schema/user'
import { updatePassword } from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { useAuth } from '../providers/AuthProvider'
import Button from '../ui/button'
import { PasswordInput } from '../ui/input'

const SecurityForm = () => {

    const {t} = useTranslation();

    const {
        formState:{errors, isSubmitting},
        ...form
    } = useForm<UpdatePasswordSchema>({
        resolver:zodResolver(updatePasswordSchema)
    });

    const {session} = useAuth();

    const router = useRouter();

    const handleChangePassword = async(data:UpdatePasswordSchema)=>{

        if(!session)return;

        try{
            await updatePassword(session.user.id, data);
            Toast.show({
                type:"success",
                text1:t("security.label"),
                text2:t("security.passwordChanged"),
                position:"top"
            });
            router.back();
        }
        catch(error){
            const axiosError = error as AxiosError;
            if(axiosError.status===400){
                form.setError("oldPassword", {message:t("security.oldPasswordError")});
            }
        }
    }

  return (
    <SafeAreaView style={{flex:1, padding:20}}>
        <KeyboardAvoidingView behavior={Platform.OS==="ios"?"padding":"height"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30} 
            style={{
                flex:1
            }}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{
                    flexDirection:"column",
                    gap:10
                }}>
                    <Text style={{fontSize:size['2xl'], textAlign:'center', marginBottom:20}}>{t("security.title")}</Text>
                    <Controller
                        name='oldPassword'
                        control={form.control}
                        render={({field:{onChange, onBlur, value}})=>(
                            <View style={style.inputContainer}>
                                <Text style={style.label}>{t("security.oldPassword")}</Text>
                                <PasswordInput
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                                {errors.oldPassword && <Text style={style.error}>{errors.oldPassword.message}</Text>}
                            </View>
                        )}
                    />
                    <Controller
                        name='newPassword'
                        control={form.control}
                        render={({field:{onChange, onBlur, value}})=>(
                            <View style={style.inputContainer}>
                                <Text style={style.label}>{t("security.newPassword")}</Text>
                                <PasswordInput
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                                {errors.newPassword && <Text style={style.error}>{errors.newPassword.message}</Text>}
                            </View>
                        )}
                    />
                    <Controller
                        name='confirm'
                        control={form.control}
                        render={({field:{onChange, onBlur, value}})=>(
                            <View style={style.inputContainer}>
                                <Text style={style.label}>{t("security.confirmPassword")}</Text>
                                <PasswordInput
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                                {errors.confirm && <Text style={style.error}>{errors.confirm.message}</Text>}
                            </View>
                        )}
                    />
                    <Button onPress={form.handleSubmit(handleChangePassword)}>
                        {isSubmitting && <ActivityIndicator color={"#fff"} size={24}/>}
                        <Text style={{color:"#fff", fontSize:size.md}}>{t("security.save")}</Text>
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SecurityForm

const style = StyleSheet.create({
    inputContainer:{
        flexDirection:"column",
        gap:10,
        width:"100%"
    },
    label:{
        color:colors.secondaryColor, 
        fontWeight:500, 
        fontSize:size.md
    },
    error:{
        color:"red",
        fontSize:size.md
    }
})