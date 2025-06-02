import { Stack } from 'expo-router'
import React from 'react'

const MessageLayout = () => {
  return (
    <Stack
        screenOptions={{
            headerShown:false
        }}
    >
      <Stack.Screen name='search' options={{
        presentation:"fullScreenModal"
      }}/>
    </Stack>
  )
}

export default MessageLayout