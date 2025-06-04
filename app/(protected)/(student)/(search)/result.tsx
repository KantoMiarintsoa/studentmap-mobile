import AccomodationItem, { AccomodationListSkeleton } from '@/components/accomodation/accomodation'
import { colors, size } from '@/const/const'
import { getFilteredAccommodations } from '@/services/api'
import { Accomodation } from '@/types/accomodation'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ResultScreen = () => {

  const params = useLocalSearchParams<{
      nameUniversity?:string,
      address?:string,
      budget?:string,
      type?:string
  }>();

  const [loading, setLoading] = useState(false);
  const [accommodations, setAccommodations] = useState<Accomodation[]>([]);

  const {t} = useTranslation();

  useEffect(()=>{
      async function fetchFilteredAccommodation(){
        try{
          setLoading(true);
          const response = await getFilteredAccommodations(params);
          console.log(response.length, "eto");
          setAccommodations(response);
        }
        catch(error){
          console.log(error);
        }
        finally{
          setLoading(false);
        }
      }
      fetchFilteredAccommodation();
  }, [JSON.stringify(params)]);


  return (
    <SafeAreaView style={{
      flex:1,
      paddingBottom:80
    }}>
      <View style={{width:"100%", flexDirection:"row", gap:10, alignItems:'center', padding:10}}>
        <TouchableOpacity onPress={()=>router.back()}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
              <MaterialIcons name="keyboard-arrow-left" size={40} color={colors.secondaryColor} />
          </View>
        </TouchableOpacity>
        <Text style={{
            fontSize:size['xl'],
            fontWeight:600
        }}>{t('search.results')}</Text>
      </View>
      <View style={{flexDirection:"column", gap:10, padding:20}}>
        {params.nameUniversity && (
            <View style={{flexDirection:"row", gap:5, alignItems:"flex-end"}}>
                <Text style={{fontWeight:600}}>{t("profile.lastname")}:</Text>
                <Text style={{color:colors.secondaryColor}}>{params.nameUniversity}</Text>
            </View>
        )}
        {params.address && (
            <View style={{flexDirection:"row", gap:5, alignItems:"flex-end"}}>
                <Text style={{fontWeight:600, color:colors.secondaryColor}}>{t("post.address")}:</Text>
                <Text style={{color:colors.secondaryColor}}>{params.address}</Text>
            </View>
        )}
        {params.budget && (
            <View style={{flexDirection:"row", gap:5, alignItems:"flex-end"}}>
                <Text style={{fontWeight:600, color:colors.secondaryColor}}>{t("search.budget")}:</Text>
                <Text style={{color:colors.secondaryColor}}>{params.budget}</Text>
            </View>
        )}
        {params.type && (
            <View style={{flexDirection:"row", gap:5, alignItems:"flex-end"}}>
                <Text style={{fontWeight:600, fontSize:size.lg}}>{t("accomodationType.type")}:</Text>
                <Text style={{color:colors.secondaryColor}}>{params.type}</Text>
            </View>
        )}
        <View style={{height:1, backgroundColor:colors.lightGray, width:"100%", marginVertical:10}}/>
    </View>
    {loading && (
        <AccomodationListSkeleton isOwner={false}/>
    )}
    <FlatList
        data={accommodations}
        keyExtractor={(item, index)=>`${item.id}_${index}`}
        renderItem={({item})=>(
            <AccomodationItem accomodation={item} isOwner={false}/>
        )}
        style={{paddingHorizontal:20}}
        contentContainerStyle={{
            gap:10
        }}
        ListEmptyComponent={()=>(
            (accommodations.length===0 && !loading) && (
                <Text style={{
                    fontSize:size.lg,
                    color:colors.secondaryColor,
                    textAlign:"center"
                }}>{t("search.noAccomodation")}</Text>
            )
        )}
    />
    </SafeAreaView>
  )
}

export default ResultScreen