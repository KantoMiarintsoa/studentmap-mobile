import TabBar from '@/components/ui/TabBar'
import { Tabs } from 'expo-router'
import React from 'react'

const StudentLayout = () => {
  return (
    <Tabs
      tabBar={(props)=>(<TabBar {...props}/>)}
        screenOptions={{
            headerShown:false
        }}
    >
      <Tabs.Screen name='(home)' options={{title:"Accueil"}}/>
      <Tabs.Screen name='(search)' options={{title:'Recherche'}}/>
      <Tabs.Screen name='menu' options={{title:"Menu"}}/>
    </Tabs>
  )
}

export default StudentLayout