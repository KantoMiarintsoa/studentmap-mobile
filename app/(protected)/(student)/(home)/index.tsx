import AccomodationItem, { AccomodationListSkeleton } from '@/components/accomodation/accomodation';
import Header from '@/components/ui/header';
import { normalizeUrl } from '@/libs/utils';
import { getAccomodationSuggestion } from '@/services/api';
import { useAccomodationStore, useMeStore } from '@/store/store';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {

    const {details} = useMeStore();
    const {accomodations, addAccomodations, setAccomodations} = useAccomodationStore();
    const [loading, setLoading] = useState(false);
    const [refresshing, setRefreshing] = useState(false);

    useEffect(()=>{
        async function fetchAccomodations(){
            if(accomodations.length>0)return;
            try{
                setLoading(true);
                const response =(await getAccomodationSuggestion())
                    .map(accomodation=>({
                            ...accomodation,
                            media:{
                              images:accomodation.media.images.map(image=>normalizeUrl(image))
                            }
                          }));
                addAccomodations(response);
            }
            catch(error){
                console.log(error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchAccomodations();
    }, [])

    const onRefresh = useCallback(async()=>{
        setRefreshing(true);
        const response =(await getAccomodationSuggestion())
            .map(accomodation=>({
                    ...accomodation,
                    media:{
                        images:accomodation.media.images.map(image=>normalizeUrl(image))
                    }
        }));
        setAccomodations(response);
        setRefreshing(false);
    },[])

  return (
    <SafeAreaView style={{
        flex:1,
        paddingBottom:80
    }}>
        <Header user={details}/>
        {
            loading?(
                // <ActivityIndicator size={"large"} color={colors.primaryColor} style={{margin:"auto"}}/>
                <AccomodationListSkeleton isOwner={false}/>
            ):(
                <FlatList
                    data={accomodations}
                    keyExtractor={(item, index)=>`${item.id}_${index}`}
                    renderItem={({item})=>(
                        <AccomodationItem accomodation={item} isOwner={false} key={item.id}/>
                    )}
                    style={{paddingHorizontal:20}}
                    contentContainerStyle={{
                        gap:20
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refresshing} onRefresh={onRefresh}/>
                    }
                />
            )
        }
    </SafeAreaView>
  )
}

export default HomeScreen