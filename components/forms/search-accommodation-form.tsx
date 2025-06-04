import { colors, size } from '@/const/const'
import { searchAccommodationSchema, SearchAccommodationSchema } from '@/schema/search'
import { useSelectUniversityStore } from '@/store/store'
import { accomodationTypes } from '@/types/accomodation'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Button from '../ui/button'
import { Input } from '../ui/input'

const SearchAccommodationForm = () => {

    const router = useRouter();

    const {university, setUniversity} = useSelectUniversityStore();

    const form = useForm<SearchAccommodationSchema>({
        resolver:zodResolver(searchAccommodationSchema)
    });

    const {t} = useTranslation();

    useEffect(()=>{
        if(university){
            form.reset({
                ...form.getValues(),
                nameUniversity:university.name
            })
        }
    }, [university]);

    const handleRedirectToSearch = (data:SearchAccommodationSchema)=>{
        router.push({
            pathname:"/(protected)/(student)/(search)/result",
            params:{...data}
        })
    }

  return (
    <View style={{flexDirection:"column", gap:10}}>
      <Controller
            name='address'
            control={form.control}
            render={({field:{onChange, onBlur, value}})=>(
            <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                <Text style={[{
                    color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                }]}>
                    {t("post.address")}
                </Text>
                <Input
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                />
            </View>
            )}
        />
        <View style={{flexDirection:"row", gap:10, width:"100%"}}>
            <Controller
                name='budget'
                control={form.control}
                render={({field:{onChange, onBlur, value}})=>(
                    <View style={{display:"flex", flexDirection:"column", gap:10, flex:2}}>
                        <Text style={[{
                            color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                        }]}>
                            {t("search.budget")}
                        </Text>
                        <Input
                            onChangeText={(text) => {
                                const numericValue = parseFloat(text);
                                onChange(isNaN(numericValue) ? undefined : numericValue);
                            }}
                            onBlur={onBlur}
                            value={value?.toString()}
                            placeholder='ex: 100.000'
                            keyboardType='numeric'
                        />
                    </View>
                )}
            />
            <Controller
                name='currency'
                control={form.control}
                render={({field:{onChange, onBlur, value}})=>(
                    <View style={{display:"flex", flexDirection:"column", gap:10, flex:1}}>
                        <Text style={[{
                            color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                        }]}>
                            {t("search.currency")}
                        </Text>
                        <Input
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value?.toString()}
                            placeholder='ex: Ar'
                        />
                    </View>
                )}
            />
        </View>
        <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
            <Text style={[{
                color:colors.secondaryColor, fontWeight:500, fontSize:size.md
            }]}>
                {t("search.universityNear")}
            </Text>
            <View style={style.viewAsInput}>
                {university?(
                    <View style={{
                        marginHorizontal:5, 
                        padding:5, 
                        borderRadius:5, 
                        backgroundColor:colors.lightGray, 
                        flexDirection:"row", 
                        gap:2, 
                        alignItems:"center",
                        marginVertical:'auto',
                        alignSelf:"flex-start"
                    }}>
                        <Text style={{color:colors.secondaryColor}}>{university.name}</Text>
                        <TouchableOpacity
                            onPress={()=>setUniversity(undefined)}
                        >
                            <MaterialCommunityIcons name="close" size={18} color={colors.secondaryColor} />
                        </TouchableOpacity>
                    </View>
                ):(
                    <TouchableOpacity style={{flex:1}} 
                        onPress={()=>{
                            // setFormData(form.getValues());
                            router.push("/(protected)/(student)/(search)/select-university");
                        }}
                    />
                )}
            </View>
        </View>
        <Controller
            name='type'
            control={form.control}
            render={({field:{value}})=>(
                <View style={{display:"flex", flexDirection:"column", gap:10, width:"100%"}}>
                    <Text style={[{
                        color:colors.secondaryColor, fontWeight:500, fontSize:size.md
                    }]}>
                        {t("accomodationType.type")}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        padding: 10,
                    }}>
                        {Object.keys(accomodationTypes).map((type, index)=>(
                            <Button 
                                style={[style.item, {backgroundColor:value===type?colors.secondaryColor:colors.lightGray}]}
                                key={index}
                                onPress={()=>form.setValue("type", type as keyof typeof accomodationTypes)}
                            >
                                <Text style={{color:value===type?"#fff":colors.secondaryColor}}>{t(`accomodationType.${type}`)}</Text>
                            </Button>
                        ))}
                        <Button 
                            style={[style.item, {backgroundColor:value===undefined?colors.secondaryColor:colors.lightGray}]}
                            onPress={()=>form.setValue("type", undefined)}
                        >
                            <Text style={{color:value===undefined?"#fff":colors.secondaryColor}}>{t("university.all")}</Text>
                        </Button>
                    </View>
                </View>
            )}
        />
        <Button onPress={form.handleSubmit(handleRedirectToSearch)}>
            <Text style={{color:"#fff"}}>Rechercher</Text>
        </Button>
    </View>
  )
}

export default SearchAccommodationForm

const style = StyleSheet.create({
    viewAsInput: {
        height: 48, // h-12 in native
        borderWidth: 1,
        borderRadius: 12, // rounded-xl
        paddingHorizontal: 12, // px-3
        fontSize: 18, // text-lg in native
        lineHeight: 22.5, // leading-[1.25] × fontSize
        borderColor: '#ccc', // replace with your theme color (border-input)
        backgroundColor: '#fff', // replace with bg-background
        color: '#000', // replace with text-foreground
        // Placeholder color is set separately using `placeholderTextColor`
    },
    item: {
        width: '48%', // nearly half of container width
        backgroundColor: '#eee',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
  },
})