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
        <Tabs.Screen name='index' options={{title:"Accueil"}}/>
        <Tabs.Screen name='post' options={{title:"Poster"}}/>
        <Tabs.Screen name='menu' options={{title:"Menu"}}/>
    </Tabs>
  )
}

export default OwnerLayout