import { getMe } from '@/services/api';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const Credits = () => {

  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(()=>{
    async function fetchCredits(){
      setLoading(true);
      const response = await getMe();
      setCredits(response.serviceRemainders);
      setLoading(false);
    }
    fetchCredits();
  }, []);

  return (
    <View style={{flex:1, padding: 20, flexDirection:'column', gap:10}}>
      <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 16}}>Crédits</Text>

    </View>
  )
}

export default Credits