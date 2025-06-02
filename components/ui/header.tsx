import { colors, size } from '@/const/const'
import { getUnreadMessages } from '@/services/api'
import { useChatStore } from '@/store/store'
import { User } from '@/types/user'
import Fontisto from '@expo/vector-icons/Fontisto'
import { useRouter } from 'expo-router'
import React, { useEffect, useMemo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Avatar from './avatar'
import { Input } from './input'

const Header = ({user}:{user:User}) => {

    const router = useRouter();
    const {unreadMessages, setUnreadMessage} = useChatStore();

    useEffect(()=>{
      async function fetchUnreadMessages(){
        try{
          const response = await getUnreadMessages();
          setUnreadMessage(response.count);
        }
        catch(error){
          console.log(error);
        }
      }
      
      if(unreadMessages<0){
        fetchUnreadMessages();
      }
    }, []);

    const text = useMemo(()=>{
      if(unreadMessages<0)return '';

      if(unreadMessages>9) return '9+';

      return unreadMessages;

    }, [unreadMessages]);

  return (
    <View style={{flexDirection:"row", paddingVertical:10, paddingHorizontal:20, alignItems:"center", gap:10}}>
      <Avatar
        name={`${user.firstName} ${user.lastName}`}
        {...(user.profilePicture && {image:{uri:user.profilePicture}})}
      />
      {user.role==="STUDENT"?(
        <Input
        style={{flex:1, height:40, fontSize:size.sm, borderRadius:0, borderColor:colors.lightGray}}
        onFocus={()=>router.push("/(protected)/(student)/(search)")}
      />
      ):(
        <View style={{
          flex:1,
          justifyContent:'center',
          flexDirection:'row'
        }}>
          <Text style={{
            fontWeight:600,
            fontSize:size.xl
          }}>Student</Text>
          <Text style={{
            fontWeight:600,
            fontSize:size.xl,
            color:colors.primaryColor
          }}>Map</Text>
        </View>
      )}
      <TouchableOpacity style={{position:"relative"}}
        onPress={()=>router.push('/(protected)/(message)')}
      >
        <Fontisto name="messenger" size={24} color={colors.secondaryColor} />
        <View style={{position:"absolute", width:20, height:20, backgroundColor:"red", top:-10, right:-10, borderRadius:10, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:"#fff", fontSize:size.sm}}>
              {text}
            </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Header