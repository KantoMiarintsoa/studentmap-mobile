import AccomodationItem from '@/components/accomodation/accomodation'
import { useAuth } from '@/components/providers/AuthProvider'
import Header from '@/components/ui/header'
import { normalizeUrl } from '@/libs/utils'
import { getOwnerAccomodation } from '@/services/api'
import { Accomodation } from '@/types/accomodation'
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const OwnerHome = () => {

  const {session} = useAuth();
  const [accomodations, setAccomodations] = useState<Accomodation[]>([]);

  useEffect(()=>{
    async function fetchData(){
      const response = (await getOwnerAccomodation())
        .map(accomodation=>({
        ...accomodation,
        media:{
          images:accomodation.media.images.map(image=>normalizeUrl(image))
        }
      }));
      setAccomodations(response);
    }
    fetchData();
  }, [])

  
  if(!session)
    return null;

  return (
    <SafeAreaView style={{
      flex:1
    }}>
      <Header user={session.user}/>
      <FlatList
        data={accomodations}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=>(
          <AccomodationItem accomodation={item} isOwner={true}/>
        )}
        style={{paddingHorizontal:20}}
        ItemSeparatorComponent={()=>(
          <View style={{height:20}}/>
        )}
      />
    </SafeAreaView>
  )
}

export default OwnerHome