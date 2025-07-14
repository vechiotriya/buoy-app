import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { useColorScheme } from '@/src/components/useColorScheme';
import CustomIcon from '@/src/components/CustomIcon';
import { useTheme } from '@/src/hooks/ThemeContextProvider';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {themePalette}=useTheme()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themePalette.primary,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
        // tabBarShowLabel:false,
        tabBarStyle:{height:'10%',paddingVertical:24},
        tabBarIconStyle:{height:37}
      }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <CustomIcon type='FontAwesome' color={color} name='home' size={35}/>,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={themePalette.primary}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ color }) => <CustomIcon type='Octicons' color={color} name='graph' size={33}/>,
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: 'Budget',
          tabBarIcon: ({ color }) => <CustomIcon type='Fontisto' color={color} name='wallet' size={28}/>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <CustomIcon type='FontAwesome' color={color} name='gear' size={35}/>,
        }}
      />
    </Tabs>
  );
}
