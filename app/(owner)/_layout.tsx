import TabBar from '@/components/ui/TabBar'
import { Tabs } from 'expo-router'
import React from 'react'

const OwnerLayout = () => {
  return (
    <Tabs
        tabBar={(props)=>(<TabBar {...props}/>)}
        screenOptions={{
            headerShown:false
        }}
    >
        <Tabs.Screen name='home' options={{title:"Accueil"}}/>
        <Tabs.Screen name='post' options={{title:"Poster"}}/>
        <Tabs.Screen name='profile' options={{title:"Profile"}}/>
    </Tabs>
  )
}

export default OwnerLayout