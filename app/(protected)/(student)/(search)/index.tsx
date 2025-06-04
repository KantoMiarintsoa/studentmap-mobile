import SearchAccommodationForm from '@/components/forms/search-accommodation-form';
import SearchUniversityForm from '@/components/forms/search-university-form';
import Button from '@/components/ui/button';
import { colors, size } from '@/const/const';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {

    const router = useRouter();

    const [query, setQuery] = useState<"ACCOMMODATION"|"UNIVERSITY">("ACCOMMODATION");
    
    const {t} = useTranslation();

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
                fontSize:size['2xl'],
                fontWeight:600
            }}>{t("tabs.search")}</Text>
        </View>
        <KeyboardAvoidingView
            style={{flex:1, paddingHorizontal:20, flexDirection:"column"}}
        >
            <ScrollView style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                <Text style={[{
                    color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                }]}>{t("search.goals")}</Text>
                <View style={{width:"100%", display:"flex", flexDirection:"row", gap:10}}>
                    <Button
                        onPress={()=>setQuery("ACCOMMODATION")}
                        variants={query==="ACCOMMODATION"?"secondary":"outline"}
                        style={{flex:1}}
                        >
                        <Text style={{color:query==="ACCOMMODATION"?"#fff":colors.secondaryColor}}>{t("search.accommodation")}</Text>
                    </Button>
                    <Button
                        onPress={()=>setQuery("UNIVERSITY")}
                        variants={query==="UNIVERSITY"?"secondary":"outline"}
                        style={{flex:1}}
                        >
                        <Text style={{color:query==="UNIVERSITY"?"#fff":colors.secondaryColor}}>{t("search.university")}</Text>
                    </Button>
                </View>
                {
                    query==="UNIVERSITY" ? (
                        <SearchUniversityForm/>
                    ):(
                        <SearchAccommodationForm/>
                    )
                }
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Search