import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform } from 'react-native';

const CustomKeyboardAvoidingView = (props:KeyboardAvoidingViewProps) => {
    
    const [keyboardAvoidingViewKey, setKeyboardAvoidingViewKey] = useState<string>("keyboardAvoidingViewKey");

    useEffect(()=>{
    
        function onKeyboardHide(){
            setKeyboardAvoidingViewKey("keyboardAvoidingViewKey"+new Date().getTime());
        }

        const keyboardHideListener = Keyboard.addListener(
            Platform.OS === 'android' 
                ? 'keyboardDidHide'
                : 'keyboardWillHide', 
                onKeyboardHide
        );

        return ()=>{
            keyboardHideListener.remove();
        }

    }, [])

  return (
    <KeyboardAvoidingView 
        keyboardVerticalOffset={Platform.OS==="ios"?60:0}
        behavior='height'
        key={keyboardAvoidingViewKey}
        {...props}
    />
  )
}

export default CustomKeyboardAvoidingView