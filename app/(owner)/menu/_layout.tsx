import { Stack } from 'expo-router'
import React from 'react'

const MenuLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{
            headerShown:false
        }}/>
        <Stack.Screen name='profile' options={{
            headerTitle:"Profil"
        }}/>
        <Stack.Screen name='security' options={{
            headerTitle:"Sécurité"
        }}/>
    </Stack>
  )
}

export default MenuLayout