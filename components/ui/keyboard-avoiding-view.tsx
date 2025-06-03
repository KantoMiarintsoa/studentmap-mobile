import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewProps, LayoutChangeEvent, Platform } from 'react-native';

const CustomKeyboardAvoidingView = (props:KeyboardAvoidingViewProps) => {

    const viewHeightRef = useRef<number | null>(null);
    const [viewHeight, setViewHeight] = useState<number | undefined>(undefined);

    const handleLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        if(viewHeightRef.current===null){
            viewHeightRef.current = height;
            console.log('onLayout view height:', height);
        }
    };

    useEffect(()=>{
    
        function onKeyboardHide(){
            console.log("called")
            if (viewHeightRef.current !== null) {
                console.log('Restoring height to:', viewHeightRef.current);
                setViewHeight(viewHeightRef.current);
            }
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
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        {...props}
        // onLayout={handleLayout}
        // style={[{height:viewHeight}, props.style]}
    />
  )
}

export default CustomKeyboardAvoidingView