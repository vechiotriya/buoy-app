import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ThemeProvider } from '@/src/hooks/ThemeContextProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider, useSelector } from 'react-redux';
import { store } from '../store/store';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'poppins-regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return ( <Provider store={store}><RootLayoutNav /></Provider> );
}

function RootLayoutNav() {
    const isLoggedIn = useSelector((state: any) => state.auth.isAuthenticated);
    console.log('User is logged in:', isLoggedIn);
  return (

    <ThemeProvider>
      <GestureHandlerRootView>
        <Stack
        screenOptions={{
          animation: "slide_from_bottom",
        }}
        >
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="sign" options={{ headerShown: false }} />
        </Stack.Protected>
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
      );
}
