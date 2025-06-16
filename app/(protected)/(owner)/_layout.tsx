import TabBar from '@/components/ui/TabBar'
import { Tabs } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'

const OwnerLayout = () => {

  const {t} = useTranslation();

  return (
    <Tabs
        tabBar={(props)=>(<TabBar {...props}/>)}
        screenOptions={{
            headerShown:false
        }}
    >
        <Tabs.Screen name='index' options={{title:t("tabs.home")}}/>
        <Tabs.Screen name='post' options={{title:t("tabs.post")}}/>
        <Tabs.Screen name='menu' options={{title:t("tabs.menu")}}/>
    </Tabs>
  )
}

export default OwnerLayout