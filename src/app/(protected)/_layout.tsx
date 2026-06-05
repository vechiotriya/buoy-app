import React, { useState } from "react";
import { ErrorBoundaryProps, Stack, useRouter } from "expo-router";
import NavigationHeader from "@/src/components/NavigationHeader";
import { TouchableHighlight, View } from "react-native";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import GradientBackground from "@/src/components/GradientBackground";
import FloatingTabMenu from "@/src/components/FloatingTabMenu";
import { scale } from "@/src/utils/scale";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import ErrorPage from "@/src/components/ErrorPage";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return <ErrorPage retry={retry} message={error.message} />;
}
export default function TabLayout() {
  const { themePalette } = useTheme();
  const addData = ["Add Income", "Add Expense", "Add Budget"];
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
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
        <Stack.Screen
          name="add-transaction"
          options={{
            presentation: "formSheet",
            headerShown: false,
            sheetGrabberVisible: true,
            sheetCornerRadius: scale(20),
            contentStyle: { backgroundColor: themePalette.background },
            sheetAllowedDetents: [0.9],
          }}
        />
      </Stack>
      <FloatingTabMenu setShowMenu={setShowMenu} />
      {showMenu && (
        <View
          style={{
            position: "absolute",
            bottom: scale(120),
            left: scale(120),
            borderRadius: scale(12),
            backgroundColor: "white",
            width: scale(150),
          }}
        >
          {addData.map((item, index) => (
            <TouchableHighlight
              underlayColor={themePalette.inputText}
              key={index}
              style={{
                padding: scale(8),
                borderBottomWidth: index === addData.length - 1 ? 0 : 1,
                borderBottomColor: themePalette.borderSecondary,
                borderRadius: scale(12),
              }}
              onPress={() => {
                if (item === "Add Income") {
                  router.push({ pathname: "/(protected)/add-transaction" , params: { type: "income" }});
                } else if (item === "Add Expense") {
                   router.push({ pathname: "/(protected)/add-transaction" , params: { type: "expense" }});
                } else {
                  router.push("/(protected)/set-budget");
                }
                setShowMenu(false);
              }}
            >
              <CustomText color={themePalette.inputText2} size={font.size_14}>
                {item}
              </CustomText>
            </TouchableHighlight>
          ))}
        </View>
      )}
    </View>
  );
}
