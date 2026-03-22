import React from "react";
import { Stack } from "expo-router";
import NavigationHeader from "@/src/components/NavigationHeader";
import { View } from "react-native";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import GradientBackground from "@/src/components/GradientBackground";
import FloatingTabMenu from "@/src/components/FloatingTabMenu";

export default function TabLayout() {
  const { themePalette } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <GradientBackground appTheme={themePalette} />
      <Stack
        screenOptions={{
          headerShown: true,
          contentStyle: { backgroundColor: "transparent" },
          animation: "slide_from_right",
          header: (props) =>
            props.route.name === "index" ? null : (
              <NavigationHeader {...props} title={props.route.name} />
            ),
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="statistics" />
        <Stack.Screen name="budget" />
        <Stack.Screen name="set-budget" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="transactions" />
      </Stack>
      <FloatingTabMenu />
    </View>
  );
}
