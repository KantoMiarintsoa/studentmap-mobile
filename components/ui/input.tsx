import { forwardRef, useState } from "react";
import { Image, StyleSheet, TextInput, TextInputProps, View } from "react-native";
import Button from "./button";

const Input = forwardRef<TextInput, TextInputProps>(({style, ...props}, ref)=>{
    return(
        <TextInput
            style={[styleSheet.input, styleSheet.focus, style]}
            ref={ref}
            {...props}
        />
    )
});

Input.displayName="Input";

const PasswordInput = forwardRef<TextInput, TextInputProps>((props, ref)=>{

    const [isPassword, setIsPassword] = useState(true);

    return (
        <View style={{
            position:'relative'
        }}>
            <Input {...props} secureTextEntry={isPassword} ref={ref}/>
            <Button variants="ghost"
                onPress={(()=>setIsPassword(prev=>!prev))}
                style={{
                    position:"absolute",
                    top:0,
                    right:7,
                    bottom:0,
                    alignItems:"center"
                }}
            >
                {isPassword?(
                    <Image
                        source={require("@/assets/icons/eye.png")}
                        style={{
                            width:23,
                            height:23
                        }}
                    />
                ):(
                    <Image
                        source={require("@/assets/icons/eye-off.png")}
                        style={{
                            width:23,
                            height:23
                        }}
                    />
                )}
            </Button>
        </View>
    )
})

PasswordInput.displayName = "PasswordInput";

export { Input, PasswordInput };

const styleSheet = StyleSheet.create({
    input: {
    height: 48, // h-12 in native
    borderWidth: 1,
    borderRadius: 12, // rounded-xl
    paddingHorizontal: 12, // px-3
    fontSize: 18, // text-lg in native
    lineHeight: 22.5, // leading-[1.25] × fontSize
    borderColor: '#ccc', // replace with your theme color (border-input)
    backgroundColor: '#fff', // replace with bg-background
    color: '#000', // replace with text-foreground
    // Placeholder color is set separately using `placeholderTextColor`
  },
  focus: {
    borderColor: '#bfdbfe', // ring-blue-200
    // no outline or shadow needed in React Native for ring styles
  },
})