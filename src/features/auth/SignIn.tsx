import { Alert, Platform, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import PrimaryInput from "@/src/components/PrimaryInput";
import nomenclature from "@/src/constants/nomenclature";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import useStyles from "./styles/SignInStyles";
import { primaryButtonStyle } from "@/src/constants/styles";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import SocialFooter from "./SocialFooter";
import { authApi } from "@/src/services/authApi";
import { loggedIn } from "@/src/store/slices/authSlice";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const { themePalette } = useTheme();
  const styles = useStyles(themePalette);
  const buttonStyle = primaryButtonStyle(themePalette);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [signIn, { isLoading }] = authApi.useSignInMutation();
  const dispatch = useDispatch();
  const handleSignIn = async () => {
    try {
      const response = await signIn(formData).unwrap();
      console.log("Sign-in successful:", response.data);
      Platform.OS === "ios"
        ? Alert.prompt(
            nomenclature.SIGN_IN_SUCCESSFUL_TITLE,
            nomenclature.SIGN_IN_SUCCESSFUL_MESSAGE,
          )
        : Alert.alert(
            nomenclature.SIGN_IN_SUCCESSFUL_TITLE,
            nomenclature.SIGN_IN_SUCCESSFUL_MESSAGE,
          );
      dispatch(
        loggedIn({
          user: formData.username,
          accessToken: response.accessToken,
        }),
      );
    } catch (error) {
      console.error("Login error:", error);
      if (Platform.OS === "ios") Alert.prompt("Login error");
      else Alert.alert("Login error");
    }
  };
  return (
    <View style={styles.container}>
      <PrimaryInput
        label={nomenclature.EMAIL+'/ '+nomenclature.USERNAME}
        value={formData.username}
        error=""
        onChangeText={(text) =>
          setFormData((prev) => {
            return { ...prev, username: text.trim() };
          })
        }
      />
      <PrimaryInput
        label={nomenclature.PASSWORD}
        value={formData.password}
        error=""
        secure
        onChangeText={(text) =>
          setFormData((prev) => {
            return { ...prev, password: text.trim() };
          })
        }
      />
      <TouchableOpacity style={styles.forgotText}>
        <CustomText size={font.size_14}>
          {nomenclature.FORGOT_PASSWORD}
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={isLoading}
        style={buttonStyle}
        onPress={handleSignIn}
      >
        <CustomText>{nomenclature.LOGIN}</CustomText>
      </TouchableOpacity>
      <SocialFooter />
    </View>
  );
};

export default SignIn;
