import UniversityItem from '@/components/university/university-item';
import { colors, size } from '@/const/const';
import { SearchUniversitySchema } from '@/schema/search';
import { getFilteredUniversity } from '@/services/api';
import { University } from '@/types/university';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UniversityResult = () => {

    const params = useLocalSearchParams<SearchUniversitySchema>();
    const [loading, setLoading] = useState(false);
    const [university, setUniversity] = useState<University[]>([]);

    useEffect(()=>{
        async function fetchUniverity(){
            try{
                setLoading(true);
                const response = await getFilteredUniversity(params);
                setUniversity(response);
                console.log(response)
            }
            catch(error){
                console.log(error)
            }
            finally{
                setLoading(false);
            }
        }
        fetchUniverity();
    }, [JSON.stringify(params)]);

    function tranformType(type:string){
        if(type==="public")
            return "Public";
        else if(type==="prive")
            return "Privé";
        else
            return "Tout";
    }

  return (
    <SafeAreaView style={{flex:1, paddingBottom:80}}>
        <View style={{width:"100%", flexDirection:"row", gap:10, alignItems:'center', padding:10}}>
            <TouchableOpacity onPress={()=>router.back()}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <MaterialIcons name="keyboard-arrow-left" size={40} color={colors.secondaryColor} />
                </View>
            </TouchableOpacity>
            <Text style={{
                fontSize:size['xl'],
                fontWeight:600
            }}>Resultats</Text>
        </View>
        <View style={{flexDirection:"column", gap:10, padding:20}}>
            {params.name && (
                <View style={{flexDirection:"row", gap:5, alignItems:"flex-end"}}>
                    <Text style={{fontWeight:600}}>Nom:</Text>
                    <Text style={{color:colors.secondaryColor}}>{params.name}</Text>
                </View>
            )}
            {params.address && (
                <View style={{flexDirection:"row", gap:5, alignItems:"flex-end"}}>
                    <Text style={{fontWeight:600, color:colors.secondaryColor}}>Adresse:</Text>
                    <Text style={{color:colors.secondaryColor}}>{params.address}</Text>
                </View>
            )}
            {params.type && (
                <View style={{flexDirection:"row", gap:5, alignItems:"flex-end"}}>
                    <Text style={{fontWeight:600, fontSize:size.lg}}>Type:</Text>
                    <Text style={{color:colors.secondaryColor}}>{tranformType(params.type)}</Text>
                </View>
            )}
            <View style={{height:1, backgroundColor:colors.lightGray, width:"100%", marginVertical:10}}/>
        </View>
        <FlatList
            data={university}
            keyExtractor={(item, index)=>`${item.id}_${index}`}
            renderItem={({item})=>(
                <UniversityItem university={item}/>
            )}
            style={{paddingHorizontal:20}}
            contentContainerStyle={{
                gap:10
            }}
            ListEmptyComponent={()=>(
                (university.length===0 && !loading) && (
                    <Text style={{
                        fontSize:size.lg,
                        color:colors.secondaryColor,
                        textAlign:"center"
                    }}>Aucune université correspond à votre recherche</Text>
                )
            )}
        />
    </SafeAreaView>
  )
}

export default UniversityResult