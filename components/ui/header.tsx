import { colors, size } from '@/const/const'
import { User } from '@/types/user'
import Fontisto from '@expo/vector-icons/Fontisto'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Avatar from './avatar'
import { Input } from './input'

const Header = ({user}:{user:User}) => {

    const router = useRouter();

  return (
    <View style={{flexDirection:"row", paddingVertical:10, paddingHorizontal:20, alignItems:"center", gap:10}}>
      <Avatar
        name={`${user.firstName} ${user.lastName}`}
        {...(user.profilePicture && {image:{uri:user.profilePicture}})}
      />
      <Input
        style={{flex:1, height:40, fontSize:size.sm, borderRadius:0, borderColor:colors.lightGray}}
      />
      <TouchableOpacity style={{position:"relative"}}>
        <Fontisto name="messenger" size={24} color={colors.secondaryColor} />
        <View style={{position:"absolute", width:20, height:20, backgroundColor:"red", top:-10, right:-10, borderRadius:10, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:"#fff", fontSize:size.sm}}>9+</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Header