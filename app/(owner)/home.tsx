import { useAuth } from '@/components/providers/AuthProvider'
import Header from '@/components/ui/header'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const OwnerHome = () => {

  const {session} = useAuth();

  if(!session)
    return null;

  return (
    <SafeAreaView style={{
      flex:1
    }}>
      <Header user={session.user}/>
    </SafeAreaView>
  )
}

export default OwnerHome