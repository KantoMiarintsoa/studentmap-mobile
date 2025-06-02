import { colors, size } from '@/const/const';
import { normalizeUrl } from '@/libs/utils';
import { Accomodation } from '@/types/accomodation';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Avatar from '../ui/avatar';

type AccomodationItemProps = {
    accomodation:Accomodation;
    isOwner?:boolean;
};

const AccomodationItem = ({accomodation, isOwner=false}:AccomodationItemProps) => {

  const router = useRouter();

  const handleRedirect = ()=>{
    if(isOwner){
      // do some stuff
      return;
    }
    router.push(`/(protected)/(student)/(home)/${accomodation.id}`);
  }

  const stars = [];
  const maxStars = 5;
  const rating = 4.5;

  for (let i = 1; i <= maxStars; i++) {
    let iconName:"star"|"star-half-empty" = 'star';
    if (i <= rating) {
      iconName = 'star';
    } else if (i - 0.5 === rating) {
      iconName = 'star-half-empty';
    }

    stars.push(
      <FontAwesome
        key={i}
        name={iconName}
        size={24}
        color={"#f0e513"}
      />
    );
  }

  return (
    <Pressable
      onPress={()=>handleRedirect()}
    >
      <View style={{flexDirection:"column", width:"100%"}}>
        {/* owner profile */}
        {!isOwner && (
          <View style={{flexDirection:"row", gap:10, alignItems:"center", marginBottom:10}}>
            <Avatar
              name={`${accomodation.owner.firstName} ${accomodation.owner.lastName}`}
              {...(accomodation.owner.profilePicture && {image:{uri:normalizeUrl(accomodation.owner.profilePicture)}})}
            />
            <Text style={{fontWeight:600, flex:1}}>
              {`${accomodation.owner.firstName} ${accomodation.owner.lastName}`}
            </Text>
            <Text>7j</Text>
          </View>
        )}
        <Image
          source={{uri:accomodation.media.images[0]}}
          style={{width:"100%", aspectRatio:1, borderRadius:size.lg}}
        />
        <View style={{flexDirection:"row", gap:10, alignItems:"flex-end"}}>
            <View style={{flexDirection:"column", marginLeft:size.md, flex:1}}>
              <Text style={{fontWeight:700, fontSize:size.lg}}>{accomodation.name}</Text>
              <Text style={{color:colors.secondaryColor, fontSize:size.md}}>{accomodation.address}</Text>
              <Text style={{color:colors.secondaryColor, fontSize:size.md}}>
                {accomodation.rentMin} - {accomodation.rentMax} {accomodation.currency}
              </Text>
              <Text style={{color:colors.secondaryColor, fontSize:size.md}}>{accomodation.receptionCapacity}</Text>
            </View>
            <View style={{flexDirection:"row"}}>
              {stars}
            </View>
        </View>
        
      </View>
    </Pressable>
  )
}

export default AccomodationItem