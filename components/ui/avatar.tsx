import { colors } from '@/const/const';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

type AvatarProps = {
    name:string;
    image?:string;
    size?:number;
    onPress?:()=>void;
}

const Avatar = ({name, image, size=50, onPress}:AvatarProps) => {

    // by convention: the last word would be the name

    const getInitials = ()=>{
        const words = name.trim().split(' ');
        if(words.length===0) return '';
        if(words.length === 1) return words[0][0].toUpperCase();
        return words[0][0].toUpperCase() + words[words.length-1][0].toUpperCase();
    }

  return (
    <TouchableOpacity onPress={()=>onPress && onPress()}
        style={{
            flexDirection:"row",
            justifyContent:'center',
            alignItems:"center",
            width:size,
            height:size,
            borderRadius:size/2,
            backgroundColor:colors.lightGray,
            ...(!image && {
                borderWidth:1,
                borderColor:colors.secondaryColor
            })
        }}
    >
        {
            image?(
                <Image
                    source={{uri:image}}
                    style={{width:"100%", height:"100%", borderRadius:size/2}}
                />
            ):(
                <Text style={{
                    fontWeight:700,
                    color:colors.secondaryColor,
                    fontSize:size/3
                }}>{getInitials()}</Text>
            )
        }
    </TouchableOpacity>
  )
}

export default Avatar