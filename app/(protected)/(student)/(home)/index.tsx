import Header from '@/components/ui/header';
import { useMeStore } from '@/store/store';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {

    const {details} = useMeStore();

  return (
    <SafeAreaView style={{
        flex:1
    }}>
        <Header user={details}/>
    </SafeAreaView>
  )
}

export default HomeScreen