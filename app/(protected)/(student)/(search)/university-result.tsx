import UniversityItem, { UniversityListSkeleton } from '@/components/university/university-item';
import { colors, size } from '@/const/const';
import { SearchUniversitySchema } from '@/schema/search';
import { getFilteredUniversity } from '@/services/api';
import { University } from '@/types/university';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UniversityResult = () => {

    const params = useLocalSearchParams<SearchUniversitySchema>();
    const [loading, setLoading] = useState(false);
    const [university, setUniversity] = useState<University[]>([]);

    const {t} = useTranslation();

    useEffect(()=>{
        async function fetchUniverity(){
            try{
                setLoading(true);
                if(params.type==="all"){
                    delete params.type;
                }
                const response = await getFilteredUniversity(params);
                setUniversity(response);
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
        return t(`university.${type}`)
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
            }}>{t("search.results")}</Text>
        </View>
        <View style={{flexDirection:"column", gap:10, padding:20}}>
            {params.name && (
                <View style={{flexDirection:"row", gap:5, alignItems:"flex-end"}}>
                    <Text style={{fontWeight:600}}>{t("profile.lastname")}:</Text>
                    <Text style={{color:colors.secondaryColor}}>{params.name}</Text>
                </View>
            )}
            {params.address && (
                <View style={{flexDirection:"row", gap:5, alignItems:"flex-end"}}>
                    <Text style={{fontWeight:600, color:colors.secondaryColor}}>{t("post.address")}:</Text>
                    <Text style={{color:colors.secondaryColor}}>{params.address}</Text>
                </View>
            )}
            {params.type && (
                <View style={{flexDirection:"row", gap:5, alignItems:"flex-end"}}>
                    <Text style={{fontWeight:600, fontSize:size.lg}}>{t("accomodationType.type")}:</Text>
                    <Text style={{color:colors.secondaryColor}}>{tranformType(params.type)}</Text>
                </View>
            )}
            <View style={{height:1, backgroundColor:colors.lightGray, width:"100%", marginVertical:10}}/>
        </View>
        {loading && (
            <UniversityListSkeleton/>
        )}
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
                    }}>{t("search.noUniversity")}</Text>
                )
            )}
        />
    </SafeAreaView>
  )
}

export default UniversityResult