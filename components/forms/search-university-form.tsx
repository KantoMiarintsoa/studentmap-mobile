import { colors, size } from '@/const/const'
import { searchUniversitySchema, SearchUniversitySchema } from '@/schema/search'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import Button from '../ui/button'
import { Input } from '../ui/input'

const SearchUniversityForm = () => {

    const router = useRouter();

    const form = useForm<SearchUniversitySchema>({
        resolver:zodResolver(searchUniversitySchema),
        defaultValues:{
            type:"all"
        }
    });

    const searchUniversity = (data:SearchUniversitySchema)=>{
        router.push({
            pathname:"/(protected)/(student)/(search)/university-result",
            params:{
                ...data
            }
        });
    }

  return (
    <View style={{flexDirection:"column", gap:10}}>
        <Controller
            name='name'
            control={form.control}
            render={({field:{onChange, onBlur, value}})=>(
                <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                    <Text style={[{
                        color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                    }]}>
                        Nom
                    </Text>
                    <Input
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder='ex: UAZ'
                    />
                </View>
            )}
        />
        <Controller
            name='address'
            control={form.control}
            render={({field:{onChange, onBlur, value}})=>(
                <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                    <Text style={[{
                        color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                    }]}>
                        Adresse
                    </Text>
                    <Input
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder='ex: Antsirabe'
                    />
                </View>
            )}
        />
        <Controller
            name='type'
            control={form.control}
            render={({field:{value}})=>(
                <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                    <Text style={[{
                        color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                    }]}>
                        Type
                    </Text>
                    <View style={{flexDirection:"row", gap:10, width:"100%"}}>
                        <Button style={{flex:1}}
                            variants={value==="public"?"secondary":"outline"}
                            onPress={()=>form.setValue("type", "public")}
                        >
                            <Text style={{color:value==="public"?"#fff":colors.secondaryColor}}>Public</Text>
                        </Button>
                        <Button style={{flex:1}}
                            variants={value==="prive"?"secondary":"outline"}
                            onPress={()=>form.setValue("type", "prive")}
                        >
                            <Text style={{color:value==="prive"?"#fff":colors.secondaryColor}}>Privé</Text>
                        </Button>
                        <Button style={{flex:1}}
                            variants={value==="all"?"secondary":"outline"}
                            onPress={()=>form.setValue("type", "all")}
                        >
                            <Text style={{color:value==="all"?"#fff":colors.secondaryColor}}>Tout</Text>
                        </Button>
                    </View>
                </View>
            )}
        />
        <Button 
            onPress={form.handleSubmit(searchUniversity)}
        >
            <Text style={{color:"#fff"}}>Rechercher</Text>
        </Button>
    </View>
  )
}

export default SearchUniversityForm