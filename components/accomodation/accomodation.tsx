import { SkeletonBase, SkeletonCircle } from "@/components/ui/skeleton";
import { colors, size } from '@/const/const';
import { normalizeUrl } from '@/libs/utils';
import { Accomodation } from '@/types/accomodation';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Avatar from '../ui/avatar';
import Stars from '../ui/stars';

type AccomodationItemProps = {
    accomodation:Accomodation;
    isOwner?:boolean;
};

export function AccomodationItemSkeleton({isOwner=false}:{isOwner?:boolean}){
  return (
    <View style={{flexDirection:"column", width:"100%", gap:10}}>
      {!isOwner && (
          <View style={{flexDirection:"row", gap:10, alignItems:"center", marginBottom:10}}>
            <SkeletonCircle size={50}/>
            <SkeletonBase width={"100%"} height={30} />
          </View>
        )}
        <SkeletonBase width={"100%"} height={150}/>
        <View style={{flexDirection:"row", gap:10, alignItems:"flex-end"}}>
          <SkeletonBase width={"100%"} height={25}/>
          <SkeletonBase width={"100%"} height={18}/>
          <SkeletonBase width={"100%"} height={18}/>
        </View>
    </View>
  )
}

export function AccomodationListSkeleton({isOwner=false}:{isOwner?:boolean}){
  return (
    <View style={{paddingHorizontal:20, gap:20}}>
      <AccomodationItemSkeleton isOwner={isOwner}/>
      <AccomodationItemSkeleton isOwner={isOwner}/>
    </View>
  )
}

const AccomodationItem = ({accomodation, isOwner=false}:AccomodationItemProps) => {

  const router = useRouter();

  const handleRedirect = ()=>{
    if(isOwner){
      // do some stuff
      return;
    }
    router.push(`/(protected)/(student)/(home)/${accomodation.id}`);
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
              name={`${accomodation.owner?.firstName} ${accomodation.owner?.lastName}`}
              {...(accomodation.owner?.profilePicture && {image:{uri:normalizeUrl(accomodation.owner?.profilePicture)}})}
            />
            <Text style={{fontWeight:600, flex:1}}>
              {`${accomodation.owner?.firstName} ${accomodation.owner?.lastName}`}
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
            <Stars rating={4.5} maxStars={5}/>
        </View>
        
      </View>
    </Pressable>
  )
}

export default AccomodationItem