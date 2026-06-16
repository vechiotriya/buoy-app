import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { ThemeProvider, useTheme } from "@/src/hooks/ThemeContextProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useSelector } from "react-redux";
import { store } from "../store/store";
import { Modal, View } from "react-native";
import CustomText from "../components/CustomText";
import { useGlobalLoading } from "../hooks/useGlobalLoading";
import LottieView from "lottie-react-native";
import { loader } from "../constants/constant";
import { scale } from "../utils/scale";
import { ToastProvider } from "../hooks/ToastContextProvider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function GlobalLoadingOverlay() {
  const isLoading = useGlobalLoading();
  const { themePalette } = useTheme();
  return (
    <Modal transparent visible={isLoading} animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: themePalette.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          source={loader}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <CustomText color={themePalette.primary} variant="bold">
          Loading...
        </CustomText>
      </View>
    </Modal>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "poppins-regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    ...FontAwesome.font,
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {
  const isLoggedIn = useSelector((state: any) => state.auth.isAuthenticated);
  console.log("User is logged in:", isLoggedIn);
  const isOnboarded = useSelector((state: any) => state.auth.isOnboarded);

  return (
    <ThemeProvider>
      <ToastProvider>
        <GestureHandlerRootView>
          <GlobalLoadingOverlay />
          <Stack
            screenOptions={{
              animation: "slide_from_bottom",
            }}
          >
            <Stack.Protected guard={!isOnboarded}>
              <Stack.Screen
                name="(onboarding)"
                options={{ headerShown: false }}
              />
            </Stack.Protected>
            <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen
                name="(protected)"
                options={{ headerShown: false }}
              />
            </Stack.Protected>
            <Stack.Protected guard={!isLoggedIn}>
              <Stack.Screen name="sign" options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Screen
              name="forgot-password"
              options={{
                headerShown: false,
                presentation: "formSheet",
                sheetGrabberVisible: true,
                sheetCornerRadius: scale(20),
                contentStyle: { backgroundColor: "transparent" },
                sheetAllowedDetents: [0.5],
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </ToastProvider>
    </ThemeProvider>
  );
}
