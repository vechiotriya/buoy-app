import React from 'react';
import { Stack, Tabs } from 'expo-router';
import { CustomIcon } from '@/src/components/CustomIcon';
import { useTheme } from '@/src/hooks/ThemeContextProvider';
import CustomTabNavigator from '@/src/components/FloatingTabMenu';

export default function TabLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="statistics"/>
      <Stack.Screen name="budget"/>
      <Stack.Screen name="settings"/>
      <Stack.Screen name="transactions"/>
    </Stack>
  );
}