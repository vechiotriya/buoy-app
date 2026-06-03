import CustomText from "@/src/components/CustomText";
import GradientBackground from "@/src/components/GradientBackground";
import TopTabNavigator from "@/src/components/TopTabNavigator";
import { loginNavigationTabs } from "@/src/constants/constant";
import font from "@/src/constants/font";
import nomenclature from "@/src/constants/nomenclature";
import { loginTitleText } from "@/src/constants/styles";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { ScrollView, View } from "react-native";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedIn } from "../store/slices/authSlice";
import { useRouter } from "expo-router";

const sign = () => {
  const { themePalette } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  //Listener for deep linking to handle authentication token from Instagram OAuth flow
  useEffect(() => {
    const sub = Linking.addEventListener("url", ({ url }) => {
      console.log("Deep link:", url);

      const { queryParams } = Linking.parse(url);

      const token = queryParams?.token;
      console.log("Extracted token:", token);
      if (token) {
        dispatch(
          loggedIn({
            user: "",
            accessToken: token,
          }),
        );
      }
    });

    return () => sub.remove();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <GradientBackground appTheme={themePalette} />
        <CustomText variant="bold" size={font.size_24} style={loginTitleText}>
          {nomenclature.LOGIN_TEXT}
        </CustomText>
        <TopTabNavigator menuHeaders={loginNavigationTabs} />
      </ScrollView>
    </View>
  );
};

export default sign;
