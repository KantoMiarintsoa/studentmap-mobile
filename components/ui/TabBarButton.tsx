import { colors } from '@/const/const';
import { icons } from '@/const/icons';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import type { GestureResponderEvent } from 'react-native';

type TabBarButtonProps = {
    onPress: (event: GestureResponderEvent) => void,
    onLongPress: (event: GestureResponderEvent) => void,
    isFocused: boolean,
    routeName: string,
    label: string
}

const TabBarButton = ({
    onPress, onLongPress, isFocused, routeName, label
}:TabBarButtonProps) => {

    const scale = useSharedValue(0);

    useEffect(()=>{
        scale.value = withSpring(isFocused?1:0, {duration:350});
    }, [scale, isFocused]);

    const animatedTextStyle = useAnimatedStyle(()=>{
        const opacity = interpolate(scale.value, [0,1], [1,0]);
        return{
            opacity
        }
    });

    const animatedIconStyle = useAnimatedStyle(()=>{
        const scaleValue =interpolate(scale.value, [0, 1], [1, 1.2]);

        const top = interpolate(scale.value, [0, 1], [0, 9]);

        return {
            transform:[{
                scale:scaleValue
            }],
            top
        };
    })

  return (
    <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={style.tabBarItem}
    >
        <Animated.View style={animatedIconStyle}>
            {icons[routeName as keyof typeof icons]({
                color:isFocused ? "#fff" : colors.secondaryColor
            })}
        </Animated.View>
        <Animated.Text style={[{ 
            color: isFocused ? colors.primaryColor : colors.secondaryColor, 
            fontWeight: isFocused?700:200,
            fontSize:12
        },
            animatedTextStyle
        ]}>
            {label}
        </Animated.Text>
    </Pressable>
  )
}

export default TabBarButton

const style = StyleSheet.create({
    tabBarItem:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:5,
    }
})