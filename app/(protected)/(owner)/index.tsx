import AccomodationItem, { AccomodationListSkeleton } from '@/components/accomodation/accomodation'
import { useAuth } from '@/components/providers/AuthProvider'
import Header from '@/components/ui/header'
import { normalizeUrl } from '@/libs/utils'
import { getOwnerAccomodation } from '@/services/api'
import { useOwnerAccomodationStore } from '@/store/store'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, RefreshControl, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const OwnerHome = () => {

  const {session} = useAuth();
  // const [accomodations, setAccomodations] = useState<Accomodation[]>([]);
  const {accomodations, setAccomodations} = useOwnerAccomodationStore();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchData(){
    setLoading(true);
    setAccomodations([]);
    const response = (await getOwnerAccomodation())
      .map(accomodation=>({
      ...accomodation,
      media:{
        images:accomodation.media.images.map(image=>normalizeUrl(image))
      }
    }));
    setAccomodations(response);
    setLoading(false);
  }

  useEffect(()=>{
    fetchData();
  }, [])

  const onRefresh = useCallback(async ()=>{
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [])

  
  if(!session)
    return null;

  return (
    <SafeAreaView style={{
      flex:1,
      paddingBottom:80
    }}>
      <Header user={session.user}/>
      {
        loading && (
          <AccomodationListSkeleton isOwner/>
        )
      }
      <FlatList
        data={accomodations}
        keyExtractor={(item, index)=>item.id.toString()+"_"+index}
        renderItem={({item})=>(
          <AccomodationItem accomodation={item} isOwner={true}/>
        )}
        style={{paddingHorizontal:20}}
        ItemSeparatorComponent={()=>(
          <View style={{height:20}}/>
        )}
        refreshControl={(
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        )}
      />
    </SafeAreaView>
  )
}

export default OwnerHome