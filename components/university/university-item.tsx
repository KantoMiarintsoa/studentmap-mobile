import { colors, size } from '@/const/const';
import { University } from '@/types/university';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { ReactNode, useState } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Button from '../ui/button';
import { SkeletonBase } from '../ui/skeleton';

export function UniversityListSkeleton(){
    return (
        <View style={{flexDirection:"column", gap:10, paddingHorizontal:20}}>
            <SkeletonBase width={"100%"} height={50}/>
            <SkeletonBase width={"100%"} height={50}/>
            <SkeletonBase width={"100%"} height={50}/>
        </View>
    )
}

const UniversityItem = ({university, children}:{university:University, children?:ReactNode}) => {
    const [collapse, setCollapse] = useState(false);
    const duration = 1500;

    const arrowDeg = useSharedValue(0);

    const animatedArrow = useAnimatedStyle(()=>{
        return {
            transform:[{rotate:`${arrowDeg.value}deg`}]
        }
    });

    const toggleCollapsed = ()=>{
        if(collapse){
            arrowDeg.value = withSpring(180, {duration});
        }
        else{
            arrowDeg.value = withSpring(0, {duration});
        }
        setCollapse(!collapse);
    }

  return (
    <View style={{flexDirection:"column", padding:10, borderRadius:10, backgroundColor:"#fff"}}>
        <View style={{flexDirection:"row"}}>
            <View style={{flexDirection:"column", flex:1}}>
                <Text style={{fontSize:size.lg}}>{university.name}</Text>
                <Text style={{color:colors.secondaryColor}}>{university.address}</Text>
                {children}
            </View>
            <TouchableOpacity onPress={()=>toggleCollapsed()}>
                <Animated.View style={animatedArrow}>
                    <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                </Animated.View>
            </TouchableOpacity>
        </View>
        <Collapsible collapsed={collapse}>
            <View style={{flexDirection:"column", gap:5, marginTop:10}}>
                <Text>{university.description}</Text>
                <View style={{flexDirection:'row', gap:5}}>
                    <Text style={{fontWeight:600}}>Trouvez nous sur:</Text>
                    <Button variants={"link"}
                        onPress={()=>{
                            Linking.openURL(university.webSite)
                        }}
                    >
                        <Text style={{color:colors.primaryColor, borderBottomColor:colors.primaryColor, borderBottomWidth:1}}>{university.webSite}</Text>
                    </Button>
                </View>
                <View style={{flexDirection:'row', gap:5, flexWrap:"wrap"}}>
                    <Text style={{fontWeight:600}}>Les filieres que nous proposons:</Text>
                    <Text>{university.mention.join(", ")}</Text>
                </View>
            </View>
        </Collapsible>
    </View>
  )
}

export default UniversityItem