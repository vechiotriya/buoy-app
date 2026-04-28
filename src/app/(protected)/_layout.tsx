import React, { useRef, useState } from "react";
import { Stack, useRouter } from "expo-router";
import NavigationHeader from "@/src/components/NavigationHeader";
import { TouchableHighlight, View } from "react-native";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import GradientBackground from "@/src/components/GradientBackground";
import FloatingTabMenu from "@/src/components/FloatingTabMenu";
import { scale } from "@/src/utils/scale";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import BottomSheet from "@gorhom/bottom-sheet";
import AddTransactionSheet from "@/src/features/home/components/AddTransactionSheet";

export default function TabLayout() {
  const { themePalette } = useTheme();
  const addData = ["Add Income", "Add Expense", "Add Budget"];
  const [showMenu, setShowMenu] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetRef2 = useRef<BottomSheet>(null);
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
      </Stack>
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
                  bottomSheetRef.current?.expand();
                } else if (item === "Add Expense") {
                  bottomSheetRef2.current?.expand();
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
      <FloatingTabMenu setShowMenu={setShowMenu} />

      <AddTransactionSheet ref={bottomSheetRef} type="income" />
      <AddTransactionSheet ref={bottomSheetRef2} type="expense" />
    </View>
  );
}
