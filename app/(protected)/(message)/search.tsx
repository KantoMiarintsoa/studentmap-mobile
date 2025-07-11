import LastConversationComponennt, { LastConversationSkeleton } from '@/components/mesage/LastConversation'
import Button from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { colors, size } from '@/const/const'
import { getUsersByFirstName } from '@/services/api'
import { User } from '@/types/user'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchUser = () => {

    const router = useRouter();
    
    const searchRef = useRef<TextInput>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const {t} =useTranslation();

    useEffect(()=>{
        if(searchRef.current){
            searchRef.current.focus();
        }
    }, []);

    const searchUser = async (firstName:string)=>{
        setQuery(firstName);
        setUsers([]);
        if(firstName.trim()===""){
            return;
        };
        try{
            setLoading(true);
            const response = await getUsersByFirstName(firstName);
            setUsers(response);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <SafeAreaView
        style={{flex:1}}
    >
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
                    placeholder={t("message.search")}
                    ref={searchRef}
                    onChangeText={(text)=>searchUser(text)}
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
            <View style={{paddingHorizontal:20}}>
                <LastConversationSkeleton length={6}/>
            </View>
        )}
        <FlatList
            data={users}
            keyExtractor={(item, index)=>`${item.id}_${index}`}
            renderItem={({item:user})=>(
                <LastConversationComponennt conversation={{
                    isRead:false,
                    isSender:false,
                    user:user,
                    createdAt:"",
                    content:`Discuter avec ${user.firstName} ${user.lastName}`
                }}/>
            )}
            style={{
                padding:20,
                paddingTop:0
            }}
            ListEmptyComponent={()=>{
                if(query===""){
                    return (
                        <Text style={{
                            fontWeight:600,
                            color:colors.secondaryColor,
                            fontSize:size.md,
                            textAlign:"center",
                            marginTop:20
                        }}>{t("message.reachGoals")}</Text>
                    )
                }
                else if(query.trim().length>0 && !loading){
                    return(
                        <Text style={{
                            fontWeight:600,
                            color:colors.secondaryColor,
                            fontSize:size.md,
                            textAlign:"center",
                            marginTop:20
                        }}>{t("message.noUsers")}</Text>
                    )
                }
            }}
        />
    </SafeAreaView>
  )
}

export default SearchUser