import { useAuth } from '@/components/providers/AuthProvider';
import Avatar from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { colors, size } from '@/const/const';
import { normalizeUrl } from '@/libs/utils';
import { UserRole } from '@/types/user';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type UserAvatarProps = {
    id:number, 
    firstName:string, 
    lastName:string, 
    profilePicture?:string, 
    role:UserRole
}

function UserAvatar({
    id, 
    firstName, 
    lastName, 
    profilePicture, 
    role
}:UserAvatarProps){

    const size = 70;

    return (
        <TouchableOpacity style={{
            width:size,
            height:size,
            borderRadius:size/2,
            padding:2,
            borderWidth:2,
            borderColor:role==="STUDENT"?"#6be841":"#35a3de",
            flexDirection:"row",
            justifyContent:"center",
            alignItems:"center"
        }}>
            <Avatar
                name={`${firstName} ${lastName}`}
                {...(profilePicture && {image:{uri:normalizeUrl(profilePicture)}})}
                size={size-10}
            />
        </TouchableOpacity>
    )
}

const MessageIndex = () => {

    const router = useRouter();
    const {session} = useAuth();
    const [users, setUsers] = useState<UserAvatarProps[]>([
        {
            id: session!.user.id,
            firstName: session!.user.firstName,
            lastName: session!.user.lastName,
            role: session!.user.role,
            profilePicture:session!.user.profilePicture
        }
    ]);

  return (
    <SafeAreaView
        style={{
            flex:1,
            flexDirection:"column"
        }}
    >
        <View style={{
            width:"100%",
            padding:10,
            flexDirection:"row",
            gap:10,
            alignItems:'center'
        }}>
            <TouchableOpacity
                onPress={()=>router.back()}
            >
                <MaterialIcons name="keyboard-arrow-left" size={40} color={colors.secondaryColor} />
            </TouchableOpacity>
            <Text style={{
                fontSize:size['2xl'],
                fontWeight:600,
                color:colors.secondaryColor
            }}>Message</Text>
        </View>
        <View style={{
            padding:10,
            flexDirection:"column",
            gap:10
        }}>
            <Input
                style={{
                    borderRadius:30,
                    width:"100%",
                    backgroundColor:colors.lightGray,
                    fontSize:size.md,
                    borderColor:"transparent"
                }}
                placeholder='Rechercher une personne'
            />
            <FlatList
                horizontal
                keyExtractor={item=>item.id.toString()}
                data={users}
                renderItem={({item})=>(
                    <UserAvatar {...item}/>
                )}
                ItemSeparatorComponent={()=>(
                    <View style={{width:10}}/>
                )}
        />
        </View>
    </SafeAreaView>
  )
}

export default MessageIndex