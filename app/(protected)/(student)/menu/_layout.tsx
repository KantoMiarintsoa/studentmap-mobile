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
    </Stack>
  )
}

export default MenuLayout