import Button from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UniversityItem from '@/components/university/university-item';
import { colors, size } from '@/const/const';
import { getFilteredUniversity } from '@/services/api';
import { useSelectUniversityStore } from '@/store/store';
import { University } from '@/types/university';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SelectUniversity = () => {

    const router = useRouter();
        
    const searchRef = useRef<TextInput>(null);
    const [universityList, setUniversityList] = useState<University[]>([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const {setUniversity} = useSelectUniversityStore();

    const {t} = useTranslation()

    useEffect(()=>{
        if(searchRef.current){
            searchRef.current.focus();
        }
    }, []);

    const searchUniversity = async (name:string)=>{
        setQuery(name);
        if(name===""){
          setUniversityList([]);
          return;
        };
        try{
          setLoading(true)
          const response = await getFilteredUniversity({name});
          setUniversityList(response);
        }
        catch(error){
          console.log(error);
        }
        setLoading(false);
    }

  return (
    <SafeAreaView style={{flex:1, paddingBottom:20}}>
        <View style={{
            flexDirection:"row",
            gap:10,
            alignItems:"center",
            padding:10
          }}>
            <TouchableOpacity
                onPress={()=>router.back()}
            >
                <MaterialIcons name="keyboard-arrow-left" size={40} color={colors.secondaryColor} />
            </TouchableOpacity>
            <View style={{flex:1}}>
                <Input
                    style={{
                        borderRadius:30,
                        backgroundColor:colors.lightGray,
                        fontSize:size.md,
                        borderColor:"transparent",
                        flex:1
                    }}
                    placeholder={t("search.searhUniversity")}
                    ref={searchRef}
                    onChangeText={(text)=>searchUniversity(text)}
                />
            </View>
            <Button variants='link'
                onPress={()=>router.back()}
            >
                <Text style={{fontWeight:600, color:colors.primaryColor}}>{t("global.cancel")}</Text>
            </Button>
        </View>
        {loading && (
          // skeleton here
          <></>
        )}
        <FlatList
          data={universityList}
          keyExtractor={(item, index)=>`${item.id}_${index}`}
          renderItem={({item})=>(
            <UniversityItem university={item}>
              <Button style={{alignSelf:"flex-start", marginTop:5}}
                onPress={()=>{
                  setUniversity(item);
                  router.back();
                }}
              >
                <Text style={{color:"#fff"}}>{t("search.select")}</Text>
              </Button>
            </UniversityItem>
          )}
          ListEmptyComponent={()=>{
            if(universityList.length===0 && query.trim().length > 0 && !loading){
              return (
                <Text style={{
                    fontSize:size.lg,
                    color:colors.secondaryColor,
                    textAlign:"center"
                }}>{t("search.noUniversity")}</Text>
              )
            }
          }}
          style={{paddingHorizontal:20}}
          contentContainerStyle={{
              gap:10
          }}
        />
    </SafeAreaView>
  )
}

export default SelectUniversity