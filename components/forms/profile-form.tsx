import { useAuth } from '@/components/providers/AuthProvider'
import Button from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { colors, size } from '@/const/const'
import { updateUserSchema, UpdateUserSchema } from '@/schema/user'
import { updateUser } from '@/services/api'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { zodResolver } from '@hookform/resolvers/zod'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from '../ui/avatar'

const ProfileForm = () => {

    const {
        formState:{errors, isSubmitting},
        ...form
    } = useForm<UpdateUserSchema>({
        resolver:zodResolver(updateUserSchema)
    });

    const {session, updateSession} = useAuth();
    const [image, setImage] = useState<string|undefined>();

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
        setImage(user.profilePicture);
    }, [session]);

    const updateImage = async (action?:"galery")=>{
        
        if(action==="galery"){

        }
        else{
            await selectImageFromCamera();
        }
    }

    const selectImageFromCamera=async()=>{
        try{
            let result = await ImagePicker.
                launchCameraAsync({
                    cameraType:ImagePicker.CameraType.front,
                    aspect:[1,1],
                    allowsEditing:true,
                    quality:1
            });
            
            if(!result.canceled){
                setImage(result.assets[0].uri);
            }
        }
        catch{
            Alert.alert("Error", "Oups, Il y a eu un erreur. Ne vous inquietez pas, on est sur le coup", [
                {
                    text:"OK",
                    style:"default"
                }
            ]);
            return;
        }
    }

    const handleUpdate = async (data:UpdateUserSchema)=>{

        if(!session)
            return;

        const {user} = session;

        try{
            const response = await updateUser(user.id, data, image);
            updateSession({...session, user:response});
            console.log(response);
        }
        catch(error){
            console.log("eto", error)
            // Alert.alert("Error", "Oups, Il y a eu un erreur. Ne vous inquietez pas, on est sur le coup", [
            //     {
            //         text:"OK",
            //         style:"default"
            //     }
            // ]);
            return;
        }
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
                            {...(image && {image:{uri:image}})}
                        />
                        <Button variants='ghost' style={style.avatarButton}
                            onPress={()=>updateImage()}
                        >
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
                            <View style={style.inputContainer}>
                                <Text style={style.label}>Nom</Text>
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
                            <View style={style.inputContainer}>
                                <Text style={style.label}>Contact</Text>
                                <Input
                                    onChangeText={onChange}
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