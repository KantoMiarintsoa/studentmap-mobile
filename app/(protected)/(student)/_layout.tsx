import TabBar from '@/components/ui/TabBar'
import { Tabs } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'

const StudentLayout = () => {

  const {t} = useTranslation();

  return (
    <Tabs
      tabBar={(props)=>(<TabBar {...props}/>)}
        screenOptions={{
            headerShown:false
        }}
    >
      <Tabs.Screen name='(home)' options={{title:t("tabs.home")}}/>
      <Tabs.Screen name='(search)' options={{title:t("tabs.search")}}/>
      <Tabs.Screen name='menu' options={{title:t("tabs.menu")}}/>
    </Tabs>
  )
}

export default StudentLayout