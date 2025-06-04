import { colors } from '@/const/const';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useEffect, useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import TabBarButton from './TabBarButton';

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {

    const [dimensions, setDimensions] = useState({width:100, height:20});

    const buttonWidth = useMemo(()=>{
        return dimensions.width / state.routes.length;
    }, [dimensions.width, state]);

    const onTabLayout = (e:LayoutChangeEvent)=>{
        setDimensions({
            height:e.nativeEvent.layout.height,
            width:e.nativeEvent.layout.width
        });
    }

    const tabPositionX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(()=>{
        return {
            transform:[{translateX:tabPositionX.value}]
        }
    })

    useEffect(()=>{
        tabPositionX.value = withSpring(buttonWidth * state.index, {duration:1500});
    }, [state.index, buttonWidth])

  return (
    <View style={style.tabBar}
        onLayout={onTabLayout}
    >
        <Animated.View
            style={[animatedStyle,{
                position:'absolute',
                backgroundColor:colors.primaryColor,
                borderRadius:30,
                marginHorizontal:12,
                height:dimensions.height-15,
                width:buttonWidth-25,
                top:8
            }]}
        />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel.toString()
            : options.title !== undefined
              ? options.title
              : route.name;


        const isFocused = state.index === index;
        console.log(index, route.name, isFocused)

        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
            }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
            <TabBarButton
                onPress={onPress}
                onLongPress={onLongPress}
                isFocused={isFocused}
                label={label}
                routeName={route.name}
                key={index}
            />
        );
      })}
    </View>
  );
}

export default TabBar;

const style = StyleSheet.create({
    tabBar:{
        position:"absolute",
        bottom:50,
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:"#fff",
        marginHorizontal:80,
        paddingVertical:10,
        shadowColor:'red',
        shadowOffset:{width:0, height:10},
        shadowRadius:10,
        borderRadius:35,
        shadowOpacity:1
    },
    tabBarItem:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:5,
    }
})