import { View, TouchableOpacity } from "react-native";
import React from "react";
import { CustomIcon } from "@/src/components/CustomIcon";
import CustomText from "@/src/components/CustomText";
import { scale } from "@/src/utils/scale";
import nomenclature from "@/src/constants/nomenclature";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import useStyles from "./styles/SignInStyles";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";

interface SocialFooterProps {
  signInWithGoogle: () => void;
}
const SocialFooter: React.FC<SocialFooterProps> = ({ signInWithGoogle }) => {
  const { themePalette } = useTheme();
  const styles = useStyles(themePalette);
  const dispatch = useDispatch();
  const router = useRouter();

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
      </View>
    </View>
  );
};

export default SocialFooter;
