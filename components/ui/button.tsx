import { colors, size } from '@/const';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type ButtonProps = {
    variants?:"primary"|"secondary"|"link"|"ghost"|"outline"
} & TouchableOpacityProps;

const Button = ({variants="primary", style, ...props}:ButtonProps) => {

  return (
    <TouchableOpacity
        style={[styleSheet[variants],style]}
        {...props}
    />
  )
}

export function GoBackButton(){
    const router = useRouter();

    return (
        <View>
            <Button style={{
                backgroundColor:colors.lightGray,
                alignSelf:"flex-start"
            }}
                onPress={()=>{
                    if(router.canGoBack()){
                        router.back();
                    }
                }}
            >
                <Image
                    source={require("@/assets/icons/back.png")}
                    style={{width:20, height:20}}
                />
            </Button>
        </View>
    )
}

export default Button

const styleSheet = StyleSheet.create({
    primary:{
        backgroundColor:colors.primaryColor,
        borderRadius:size.md,
        paddingHorizontal:20,
        paddingVertical:13,
        display:"flex",
        flexDirection:"row",
        justifyContent:'center'
    },
    secondary:{
        backgroundColor:colors.secondaryColor,
        borderRadius:size.md,
        paddingHorizontal:20,
        paddingVertical:13,
        display:"flex",
        justifyContent:"center",
        flexDirection:"row"
    },
    link:{
        backgroundColor:"transparent",
        display:"flex",
        flexDirection:"row"
    },
    ghost:{
        backgroundColor:"transparent",
        display:"flex",
        flexDirection:"row",
        justifyContent:'center'
    },
    outline:{
        borderRadius:size.md,
        paddingHorizontal:20,
        paddingVertical:13,
        display:"flex",
        flexDirection:"row",
        borderWidth:1,
        borderColor:colors.lightGray,
        justifyContent:'center',
        alignItems:"center"
    }
})