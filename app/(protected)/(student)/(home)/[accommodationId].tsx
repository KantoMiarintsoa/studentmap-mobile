import RateView from '@/components/accomodation/rate';
import { useSocket } from '@/components/providers/SocketProvider';
import Avatar from '@/components/ui/avatar';
import Button from '@/components/ui/button';
import { UserSkeleton } from '@/components/ui/skeleton';
import Stars from '@/components/ui/stars';
import { colors, size } from '@/const/const';
import { normalizeUrl } from '@/libs/utils';
import { getAccomodationDetails } from '@/services/api';
import { useAccomodationStore } from '@/store/store';
import { Accomodation } from '@/types/accomodation';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
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
  }, [accomodation]);

  const [open, setOpen] = useState(false);

  const {t} = useTranslation();

  const {socket} = useSocket();

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

  const sendInterest = ()=>{
    if(!socket) return;
    if(!accomodation) return;
    socket.emit("sendMessage", {
      receiverId:accomodation.owner.id,
      content:`Bonjour, je suis interessé par votre publication: ${accomodation.name}, à l'adresse ${accomodation.address}`
    });
    router.push(`/(protected)/(message)/${accomodation.owner.id}`);
  }

  return (
    <SafeAreaView style={{
        flex:1,
        paddingBottom:80
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
            <UserSkeleton/>
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

        {
          !accomodation ? (
            // skeleton
            <></>
          ):(
            // everything about the accomodation goes here
            <View style={{flexDirection:"column", gap:10, paddingHorizontal:20, paddingTop:20, flex:1}}>
              <View style={{flexDirection:"row", gap:10, alignItems:"flex-end"}}>
                <View style={{flexDirection:"column", marginLeft:size.md, flex:1}}>
                  <Text style={{fontWeight:700, fontSize:size.lg}}>{accomodation.name}</Text>
                  <Text style={{color:colors.secondaryColor, fontSize:size.md}}>{accomodation.address}</Text>
                  <Text style={{color:colors.secondaryColor, fontSize:size.md}}>
                    {accomodation.rentMin} - {accomodation.rentMax} {accomodation.currency}
                  </Text>
                  <Text style={{color:colors.secondaryColor, fontSize:size.md}}>{accomodation.receptionCapacity}</Text>
                </View>
                <Stars rating={accomodation.rating} maxStars={5}/>
              </View>
              <View style={{flexDirection:"row", gap:10}}>
                <Button style={{flex:1}}
                  onPress={()=>{
                    // router.push(`/(protected)/(message)/${accomodation.owner.id}`);
                    sendInterest();
                  }}
                >
                  <Text style={{color:"#fff"}}>{t("accommodation.interested")}</Text>
                </Button>
                <Button 
                  style={{backgroundColor:colors.lightGray}}
                  onPress={()=>setOpen(true)}
                >
                    <Text style={{fontWeight:600}}>{t("accommodation.note")}</Text>
                </Button>
              </View>
              {/* gallery */}
              <Text style={{fontWeight:600, color:colors.secondaryColor, fontSize:size['lg'], textAlign:"center"}}>
                {t("accommodation.gallery")}
              </Text>
              <FlatList
                data={accomodation.media.images}
                keyExtractor={(item)=>item}
                renderItem={({item})=>(
                  <Image
                    source={{uri:item}}
                    style={{width:"100%", aspectRatio:1}}
                  />
                )}
                contentContainerStyle={{
                  gap:10
                }}
              />
            </View>
          )
        }
        <Modal
          onRequestClose={()=>setOpen(false)}
          visible={open}
          animationType='slide'
        >
          {accomodation && (
            // <View style={{fled}}>
              <RateView accommodation={accomodation} onClose={()=>setOpen(false)}
              
                onSuccess={(newRating)=>setAccomodation({...accomodation, rating:newRating})}
              />
            // </View>
          )}
        </Modal>
    </SafeAreaView>
  )
}

export default AccomodationDetails