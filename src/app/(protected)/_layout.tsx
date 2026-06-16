import React, { useEffect, useState } from "react";
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
import messaging, {
  AuthorizationStatus,
  getMessaging,
  getToken,
  onMessage,
  onTokenRefresh,
  requestPermission,
} from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import { useSendFcmTokenMutation } from "@/src/services/notificationsApi";
import { useToast } from "@/src/hooks/ToastContextProvider";
import { Linking } from "react-native";
import { getApp } from "@react-native-firebase/app";

// Background handler - must be at module level, outside component
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Background message:", remoteMessage);
});
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return <ErrorPage retry={retry} message={error.message} />;
}
export default function TabLayout() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
  const [sendFcmToken] = useSendFcmTokenMutation({});
  const { show } = useToast();
  const { themePalette } = useTheme();
  const addData = ["Add Income", "Add Expense", "Add Budget"];
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const setup = async () => {
      const app = getApp();
      const fcmMessaging = getMessaging(app);

      // Permissions
      const { status } = await Notifications.requestPermissionsAsync();
      const authStatus = await requestPermission(fcmMessaging);
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;

      if (enabled && status === "granted") {
        const token = await getToken(fcmMessaging);
        await sendFcmToken({ fcmToken: token });
      } else {
        show({
          title: "Notifications Disabled",
          message: "Please enable notifications in your device settings.",
          action: () => Linking.openSettings(),
          type: "warning",
        });
      }

      // Foreground messages
      const unsubscribeMessage = onMessage(
        fcmMessaging,
        async (remoteMessage) => {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: remoteMessage.notification?.title,
              body: remoteMessage.notification?.body,
            },
            trigger: null,
          });
        },
      );

      // Token refresh
      const unsubscribeTokenRefresh = onTokenRefresh(
        fcmMessaging,
        async (token) => {
          await sendFcmToken({ fcmToken: token });
        },
      );

      return () => {
        unsubscribeMessage();
        unsubscribeTokenRefresh();
      };
    };

    setup();
  }, []);
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
        <Stack.Screen
          name="about"
          options={{
            presentation: "formSheet",
            headerShown: false,
            sheetGrabberVisible: true,
            sheetCornerRadius: scale(20),
            contentStyle: { backgroundColor: themePalette.background },
            sheetAllowedDetents: [0.8],
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
                  router.push({
                    pathname: "/(protected)/add-transaction",
                    params: { type: "income" },
                  });
                } else if (item === "Add Expense") {
                  router.push({
                    pathname: "/(protected)/add-transaction",
                    params: { type: "expense" },
                  });
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
