import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { CustomIcon } from "@/src/components/CustomIcon";
import CustomText from "@/src/components/CustomText";
import { scale } from "@/src/utils/scale";
import nomenclature from "@/src/constants/nomenclature";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import useStyles from "./styles/SignInStyles";
import * as Linking from "expo-linking";
import { storage } from "@/src/services/storage";

interface SocialFooterProps {
  signInWithGoogle: () => void;
}
const SocialFooter: React.FC<SocialFooterProps> = ({ signInWithGoogle }) => {
  const { themePalette } = useTheme();
  const styles = useStyles(themePalette);
  const loginWithInstagram = () => {
    const balance = storage.getNumber("initialBalance") || 0;
    const state = encodeURIComponent(JSON.stringify({ balance: balance || 0 }));
    const authUrl =
      `https://www.instagram.com/oauth/authorize` +
      `?client_id=${process.env.EXPO_PUBLIC_INSTAGRAM_APP_ID}` +
      `&redirect_uri=${encodeURIComponent(process.env.EXPO_PUBLIC_INSTAGRAM_REDIRECT_URI || "")}` +
      `&scope=instagram_business_basic` +
      `&response_type=code` +
      `&state=${state}`;

    Linking.openURL(authUrl);
  };
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        marginTop: scale(30),
      }}
    >
      <View style={styles.footerContainer}>
        <CustomText>{nomenclature.OR_CONTINUE_WITH}</CustomText>
      </View>
      <View
        style={{
          flexDirection: "row",
          columnGap: scale(12),
          marginTop: scale(20),
          marginBottom: scale(30),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            signInWithGoogle();
          }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: themePalette.background,
            borderWidth: 1,
            borderColor: themePalette.borderColor,
            borderRadius: 12,
            width: scale(70),
            aspectRatio: 1,
          }}
        >
          <CustomIcon
            name="google"
            type="FontAwesome"
            size={scale(20)}
            color={themePalette.tabIconDefault}
            iconStyle={{ marginBottom: -3 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: themePalette.background,
            borderWidth: 1,
            borderColor: themePalette.borderColor,
            borderRadius: 12,
            width: scale(70),
            aspectRatio: 1,
          }}
          onPress={() => {
            loginWithInstagram();
          }}
        >
          <CustomIcon
            name="instagram"
            type="Entypo"
            size={scale(20)}
            color={themePalette.tabIconDefault}
            iconStyle={{ marginBottom: -3 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialFooter;
