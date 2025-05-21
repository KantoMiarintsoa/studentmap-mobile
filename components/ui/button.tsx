import { colors, size } from '@/const';
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type ButtonProps = {
    variants?:"primary"|"secondary"|"link"
} & TouchableOpacityProps;

const Button = ({variants="primary", style, ...props}:ButtonProps) => {

  return (
    <TouchableOpacity
        style={[
            variants==="primary"?
                styleSheet.primary:
                (variants==="secondary"?styleSheet.secondary:styleSheet.link),
            style]}
        {...props}
    />
  )
}

export default Button

const styleSheet = StyleSheet.create({
    primary:{
        backgroundColor:colors.primaryColor,
        borderRadius:size.md,
        paddingHorizontal:20,
        paddingVertical:13
    },
    secondary:{
        backgroundColor:colors.secondaryColor,
        borderRadius:size.md,
        paddingHorizontal:20,
        paddingVertical:13,
        display:"flex",
        justifyContent:"center"
    },
    link:{

    }
})