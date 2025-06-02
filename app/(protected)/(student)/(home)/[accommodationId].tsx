import Avatar from '@/components/ui/avatar';
import { colors, size } from '@/const/const';
import { normalizeUrl } from '@/libs/utils';
import { getAccomodationDetails } from '@/services/api';
import { useAccomodationStore } from '@/store/store';
import { Accomodation } from '@/types/accomodation';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccomodationDetails = () => {

  const {accommodationId} = useLocalSearchParams<{
    accommodationId:string
  }>();
  const {accomodations} = useAccomodationStore();
  const [accomodation, setAccomodation] = useState<Accomodation|undefined>(()=>{
      return accomodations.find(a=>a.id===parseInt(accommodationId));
  });
  const router = useRouter();
  const user = useMemo(()=>{
    return accomodation?.owner;
  }, [accomodation])

  useEffect(()=>{
    async function fetchAccomodation(){
      if(accomodation)return;
      try{
        const response = await getAccomodationDetails(parseInt(accommodationId));
        setAccomodation(response);
      }
      catch(error){
        console.log(error)
      }
    }
    fetchAccomodation();
  }, [accommodationId]);

  return (
    <SafeAreaView style={{
        flex:1
    }}>
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
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <MaterialIcons name="keyboard-arrow-left" size={40} color={colors.secondaryColor} />
            </View>
        </TouchableOpacity>
        {!user?(
            // skeleton later
            <></>
        ):(
            <>
                <Avatar
                    name={`${user.firstName} ${user.lastName}`}
                    size={30}
                    {...(user.profilePicture && {image:{uri:normalizeUrl(user.profilePicture)}})}
                />
                <Text style={{fontWeight:600, color:colors.secondaryColor, fontSize:size.lg, flex:1}}>{user.firstName} {user.lastName}</Text>
                <TouchableOpacity onPress={()=>{
                  router.push(`/(protected)/(message)/${user.id}`);
                }}>
                  <Fontisto name="messenger" size={24} color={colors.secondaryColor} />
                </TouchableOpacity>
            </>
        )}
            
        </View>
    </SafeAreaView>
  )
}

export default AccomodationDetails