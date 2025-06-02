import SearchUniversityForm from '@/components/forms/search-university-form';
import Button from '@/components/ui/button';
import CustomKeyboardAvoidingView from '@/components/ui/keyboard-avoiding-view';
import { colors, size } from '@/const/const';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {

    const router = useRouter();

    const [query, setQuery] = useState<"ACCOMMODATION"|"UNIVERSITY">("ACCOMMODATION");

  return (
    <SafeAreaView style={{
        flex:1
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
            }}>Recherche</Text>
        </View>
        <CustomKeyboardAvoidingView
            style={{flex:1, paddingHorizontal:20}}
        >
            <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                <Text style={[{
                    color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                }]}>Je cherche un(e)</Text>
                <View style={{width:"100%", display:"flex", flexDirection:"row", gap:10}}>
                    <Button
                        onPress={()=>setQuery("ACCOMMODATION")}
                        variants={query==="ACCOMMODATION"?"secondary":"outline"}
                        style={{flex:1}}
                        >
                        <Text style={{color:query==="ACCOMMODATION"?"#fff":colors.secondaryColor}}>Logement</Text>
                    </Button>
                    <Button
                        onPress={()=>setQuery("UNIVERSITY")}
                        variants={query==="UNIVERSITY"?"secondary":"outline"}
                        style={{flex:1}}
                        >
                        <Text style={{color:query==="UNIVERSITY"?"#fff":colors.secondaryColor}}>Université</Text>
                    </Button>
                </View>
                {
                    query==="UNIVERSITY" && (
                        <SearchUniversityForm/>
                    )
                }
            </View>
        </CustomKeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Search