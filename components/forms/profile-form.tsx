import { useAuth } from '@/components/providers/AuthProvider'
import Button from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { colors, size } from '@/const/const'
import { updateUserSchema, UpdateUserSchema } from '@/schema/user'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from '../ui/avatar'

const ProfileForm = () => {

    const {
        formState:{errors, isSubmitting},
        ...form
    } = useForm<UpdateUserSchema>({
        resolver:zodResolver(updateUserSchema)
    });

    const {session} = useAuth();

    if(!session)
        return null;

    useEffect(()=>{
        if(!session)
            return;
        const {user}=session;
        form.reset({
            firstName:user.firstName,
            lastName:user.lastName,
            contact:user.contact
        });
    }, [session]);

    const handleUpdate = async (data:UpdateUserSchema)=>{
        console.log(data);
    }

  return (
    <SafeAreaView style={{flex:1, padding:20}}>
        <KeyboardAvoidingView
            behavior={Platform.OS==="ios"?"padding":"height"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30} 
            style={{
                flex:1
            }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{
                    flexDirection:"column",
                    gap:10
                }}>
                    <View style={style.avatarContainer}>
                        <Avatar
                            name={`${session.user.firstName} ${session.user.lastName}`}
                            size={200}
                        />
                        <Button variants='ghost' style={style.avatarButton}>
                            <FontAwesome name="camera" size={15} color="#fff" />
                        </Button>
                    </View>
                    <Controller
                        name='firstName'
                        control={form.control}
                        render={({field:{onChange, onBlur, value}})=>(
                            <View style={style.inputContainer}>
                                <Text style={style.label}>Prenom</Text>
                                <Input
                                    onChange={onChange}
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
                            <View style={style.inputContainer}>
                                <Text style={style.label}>Nom</Text>
                                <Input
                                    onChange={onChange}
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
                            <View style={style.inputContainer}>
                                <Text style={style.label}>Contact</Text>
                                <Input
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            </View>
                        )}
                    />
                    <Button onPress={form.handleSubmit(handleUpdate)}>
                        {isSubmitting && <ActivityIndicator color={"#fff"} size={24}/>}
                        <Text style={{color:"#fff", fontSize:size.md}}>Enregistrer</Text>
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ProfileForm

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
    avatarContainer:{
        flexDirection:"row",
        justifyContent:"center",
        position:'relative',
        width:200,
        height:200,
        marginHorizontal:'auto'
    },
    avatarButton:{
        width:40, 
        height:40, 
        padding:10, 
        borderRadius:20, 
        backgroundColor:colors.secondaryColor,
        position:'absolute',
        bottom:20,
        right:10,
        flexDirection:"row",
        alignItems:"center"
    }
})