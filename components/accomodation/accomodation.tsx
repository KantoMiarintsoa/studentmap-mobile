import { colors, size } from '@/const/const';
import { Accomodation } from '@/types/accomodation';
import React from 'react';
import { Image, Text, View } from 'react-native';

type AccomodationItemProps = {
    accomodation:Accomodation;
    isOwner?:boolean;
};

const AccomodationItem = ({accomodation, isOwner=false}:AccomodationItemProps) => {
  return (
    <View style={{flexDirection:"column", width:"100%"}}>
      <Image
        source={{uri:accomodation.media.images[0]}}
        style={{width:"100%", aspectRatio:1, borderRadius:size.lg}}
      />
      <Text style={{fontWeight:700, fontSize:size.lg, marginLeft:size.md}}>{accomodation.name}</Text>
      <Text style={{color:colors.secondaryColor, fontSize:size.md, marginLeft:size.md}}>{accomodation.address}</Text>
    </View>
  )
}

export default AccomodationItem