import { useAuth } from '@/components/providers/AuthProvider'
import Button from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { colors, size } from '@/const/const'
import { normalizeUrl } from '@/libs/utils'
import { updateUserSchema, UpdateUserSchema } from '@/schema/user'
import { updateUser } from '@/services/api'
import { useMeStore } from '@/store/store'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { zodResolver } from '@hookform/resolvers/zod'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import Avatar from '../ui/avatar'

const ProfileForm = () => {

    const {
        formState:{isSubmitting},
        ...form
    } = useForm<UpdateUserSchema>({
        resolver:zodResolver(updateUserSchema)
    });

    const { updateSession, session} = useAuth();
    const [image, setImage] = useState<string|undefined>();
    const {details} = useMeStore();
    const {t} = useTranslation();

    useEffect(()=>{
        form.reset({
            firstName:details.firstName,
            lastName:details.lastName,
            contact:details.contact
        });
        setImage(details.profilePicture);
    }, [details]);


    const updateImage = async (action?:"galery")=>{
        
        if(action==="galery"){
            await selecImageFromGallery();
        }
        else{
            await selectImageFromCamera();
        }
    }

    const selecImageFromGallery = async()=>{
        try{
            let result = await ImagePicker.
                launchImageLibraryAsync({
                    mediaTypes:["images"],
                    allowsEditing:true,
                    aspect:[1,1],
                    quality:1
                });
            if(!result.canceled){
                setImage(result.assets[0].uri);
            }
        }
        catch{
            Alert.alert("Error", t("global.handlingError"), [
                {
                    text:"OK",
                    style:"default"
                }
            ]);
            return;
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
            Alert.alert("Error", t("global.handlingError"), [
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
            if(response.profilePicture){
                response.profilePicture=normalizeUrl(response.profilePicture);
            }
            updateSession({...session, user:response});
            console.log(response);

            Toast.show({
                type:"success",
                text1:t("profile.updated"),
                text2:t("profile.updatedSuccessfully")
            });
        }
        catch(error){
            console.log("eto", error)
            Alert.alert("Error", t("global.handlingError"), [
                {
                    text:"OK",
                    style:"default"
                }
            ]);
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
                            name={`${details.firstName} ${details.lastName}`}
                            size={200}
                            {...(image && {image:{uri:image}})}
                            onPress={()=>updateImage("galery")}
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
                                <Text style={style.label}>{t("profile.firstname")}</Text>
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
                                <Text style={style.label}>{t("profile.lastname")}</Text>
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
                                <Text style={style.label}>{t("profile.contact")}</Text>
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
                        <Text style={{color:"#fff", fontSize:size.md}}>{t("global.save")}</Text>
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