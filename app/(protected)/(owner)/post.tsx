import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { colors, size } from '@/const/const';
import { addAccomodationSchema, AddAccomodationSchema } from '@/schema/accomodation';
import { addAccomodation } from '@/services/api';
import { accomodationTypes } from '@/types/accomodation';
import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

function UploadedImage({source, onRemoveImage}:{source:string, onRemoveImage?:(source:string)=>void}){
  return (
    <View style={style.uploadedImage}>
      <Image source={{uri:source}}
        style={style.image}
      />
      <TouchableOpacity style={style.removeButon}
        onPress={()=>onRemoveImage && onRemoveImage(source)}
      >
        <Ionicons name="close" size={18} color={colors.lightGray} />
      </TouchableOpacity>
    </View>
  )
}

const Post = () => {

  const [images, setImages] = useState<string[]>([]);

  const {
    formState:{errors, isSubmitting},
    ...form
  } = useForm<AddAccomodationSchema>({
    resolver:zodResolver(addAccomodationSchema),
    defaultValues:{
      type:"APARTEMENT"
    }
  });

  const selectImages = async()=>{
    try{
      let result = await ImagePicker.
        launchImageLibraryAsync({
          mediaTypes:["images"],
          allowsMultipleSelection:true
        });

      if(!result.canceled){
        setImages(prev=>[...prev, ...result.assets.map(r=>r.uri)]);
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

  
    const removeImage = (source:string)=>{
      setImages(prev=>prev.filter(image=>image!==source));
    }

    const handlePostAccomodation = async (data:AddAccomodationSchema)=>{
      if(images.length===0){
        form.setError("root", {message:"images required"});
        return;
      }

      try{
        const response = await addAccomodation(data, images);
        console.log(response);
        form.reset({
          type:"APARTEMENT"
        });
        setImages([]);
        Toast.show({
          type:"success",
          text1:"Logement ajouté"
        });
      }
      catch(error){
        console.log(error);

        const axiosError = error as AxiosError;
        console.log(axiosError.response?.data);
      }
    }

    const imageError = useMemo(()=>{
      if(images.length===0 && errors.root && errors.root.message?.includes("images")){
        return "Veuillez inserer au moins une image";
      }
      return undefined
    }, [errors, images])

  return (
    <SafeAreaView style={{flex:1, padding:20, flexDirection:"column", gap:20, paddingBottom:70}}>
      <KeyboardAvoidingView style={{flex:1, flexDirection:"column", gap:10}}
          behavior={Platform.OS==="ios" ?"padding":"height"}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
      >
      <Text style={{fontSize:size.xl, fontWeight:600, textAlign:'center', marginTop:20}}>Publier votre logement à loyer</Text>
      <View style={{flexDirection:"column", gap:10}}>
        <FlatList
          horizontal
          data={images}
          keyExtractor={(item, index)=>item+"_"+index}
          renderItem={({item})=>(
            <UploadedImage source={item} onRemoveImage={(source)=>removeImage(source)}/>
          )}
          style={{...(images.length===0 && {display:"none"})}}
        />
        <Button variants='outline' style={{width:'auto', alignSelf:"center", ...(imageError && {borderColor:"red"})}}
          onPress={()=>selectImages()}
        >
          <Text>Ajouter des photos</Text>
        </Button>
        {imageError && <Text style={[style.textError, {textAlign:'center'}]}>{imageError}</Text>}
      </View>
        <View
          style={{flex:3}}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{flexDirection:'column', gap:10}}>
              <Controller
                  name='name'
                  control={form.control}
                  render={({field:{onChange, onBlur, value}})=>(
                    <View style={style.inputContainer}>
                        <Text style={[style.label, errors.name && style.textError]}>Nom*</Text>
                        <Input
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                    </View>
                  )}
              />  
              <Controller
                  name='address'
                  control={form.control}
                  render={({field:{onChange, onBlur, value}})=>(
                    <View style={style.inputContainer}>
                        <Text style={[style.label, errors.address && style.textError]}>
                          {errors.address ?"Adresse* Cet adresse est deja pris":"Adresse*"}
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
                  name='area'
                  control={form.control}
                  render={({field:{onChange, onBlur, value}})=>(
                    <View style={style.inputContainer}>
                        <Text style={[style.label, errors.name && style.textError]}>Suface*</Text>
                        <Input
                          onChangeText={(text) => {
                            const numericValue = parseFloat(text);
                            onChange(isNaN(numericValue) ? undefined : numericValue);
                          }}
                          onBlur={onBlur}
                          value={value?.toString()}
                          keyboardType='numeric'
                          placeholder='en m2'
                        />
                    </View>
                  )}
              />
              <Controller
                  name='receptionCapacity'
                  control={form.control}
                  render={({field:{onChange, onBlur, value}})=>(
                    <View style={style.inputContainer}>
                        <Text style={[style.label, errors.address && style.textError]}>
                          Capacite de reception
                        </Text>
                        <Input
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          placeholder='ex: 4 personnes'
                        />
                    </View>
                  )}
              />
              <View style={{flexDirection:"row", width:"100%", gap:10}}>
                  <Controller
                    name='rentMin'
                    control={form.control}
                    render={({field:{onChange, onBlur, value}})=>(
                      <View style={{flex:1}}>
                        <Text style={style.label}>Loyer min</Text>
                        <Input
                          onChangeText={(text) => {
                            const numericValue = parseFloat(text);
                            onChange(isNaN(numericValue) ? undefined : numericValue);
                          }}
                          onBlur={onBlur}
                          value={value?.toString()}
                          keyboardType='numeric'
                        />
                      </View>
                    )}
                  />
                  <Controller
                    name='rentMax'
                    control={form.control}
                    render={({field:{onChange, onBlur, value}})=>(
                      <View style={{flex:1}}>
                        <Text style={style.label}>Loyer max</Text>
                        <Input
                          onChangeText={(text) => {
                            const numericValue = parseFloat(text);
                            onChange(isNaN(numericValue) ? undefined : numericValue);
                          }}
                          onBlur={onBlur}
                          value={value?.toString()}
                          keyboardType='numeric'
                        />
                      </View>
                    )}
                  />
              </View>
              <Controller
                name='type'
                control={form.control}
                render={({field:{value}})=>(
                  <View style={style.inputContainer}>
                    <Text style={style.label}>Type</Text>
                    <View style={{flexDirection:"column", gap:2}}>
                     {Object.keys(accomodationTypes).map((type, index)=>(
                      <Button 
                        style={{width:"100%", backgroundColor:value===type?colors.secondaryColor:colors.lightGray}}
                        key={index}
                        onPress={()=>form.setValue("type", type as keyof typeof accomodationTypes)}
                      >
                        <Text style={{color:value===type?"#fff":colors.secondaryColor}}>{type}</Text>
                      </Button>
                     ))}
                    </View>
                  </View>
                )}
              />
            </View>
          </ScrollView>
          <Button style={{marginTop:10}} onPress={form.handleSubmit(handlePostAccomodation)}>
            {isSubmitting && <ActivityIndicator color={"#fff"} size={"small"}/>}
            <Text style={{color:"#fff"}}>Publier</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Post

const style = StyleSheet.create({
  uploadedImage:{
    width:120,
    height:120,
    position:'relative',
    padding:10
  },
  removeButon:{
    position:'absolute',
    top:10,
    right:0,
    backgroundColor:colors.secondaryColor,
    padding:5,
    width:30,
    height:30,
    borderRadius:15,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:"center"
  },
  image:{
    width:"100%", 
    height:"100%", 
    borderRadius:size.lg
  },
  textError:{
    color:"red"
  },
  inputContainer:{
    flexDirection:"column",
    gap:10,
    width:"100%"
  },
  label:{
    color:colors.secondaryColor, 
    fontWeight:500, 
    fontSize:size.md
  }
})