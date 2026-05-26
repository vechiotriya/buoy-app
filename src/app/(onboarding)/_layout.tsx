import GradientBackground from "@/src/components/GradientBackground";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function OnboardingLayout() {
  const { themePalette } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <GradientBackground appTheme={themePalette} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="balance" />
      </Stack>
    </View>
  );
}
