import { Stack } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

const MenuLayout = () => {

  const {t} = useTranslation();

  return (
    <Stack>
        <Stack.Screen name='index' options={{
            headerShown:false
        }}/>
        <Stack.Screen name='profile' options={{
            headerTitle:t("header.profile")
        }}/>
        <Stack.Screen name='security' options={{
            headerTitle:t("header.security")
        }}/>
        <Stack.Screen name='payments' options={{
            headerTitle:t("header.payment")
        }}/>
        <Stack.Screen name='add-method' options={{
          headerShown:false
        }}/>
        <Stack.Screen name='credits' options={{
          headerTitle:t("header.credits")
        }}/>
    </Stack>
  )
}

export default MenuLayout