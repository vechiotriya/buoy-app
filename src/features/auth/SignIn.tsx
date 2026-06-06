import { TouchableOpacity, View } from "react-native";
import React, { useMemo, useState } from "react";

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
import { useGoogleAuth } from "@/src/hooks/useGoogleAuth";
import { useRouter } from "expo-router";
import { useToast } from "@/src/hooks/ToastContextProvider";


const SignIn = () => {
  const { themePalette } = useTheme();

  const styles = useStyles(themePalette);
  const buttonStyle = primaryButtonStyle(themePalette);
  const router = useRouter();
  const dispatch = useDispatch();
  const { show } = useToast();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [signIn, { isLoading }] = authApi.useSignInMutation();

  const { signIn: googleSignIn } = useGoogleAuth();

  const usernameError = useMemo(() => {
    if (!formData.username) return "";
    if (formData.username.length < 3)
      return "Username is too short";

    return "";
  }, [formData.username]);

  const passwordError = useMemo(() => {
    if (!formData.password) return "";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters";

    return "";
  }, [formData.password]);

  const isDisabled =
    isLoading ||
    !formData.username ||
    !formData.password ||
    !!usernameError ||
    !!passwordError;

  const handleSignIn = async () => {
    try {
      const payload = {
        username: formData.username.trim(),
        password: formData.password,
      };

      const response = await signIn(payload).unwrap();

      dispatch(
        loggedIn({
          user: payload.username,
          accessToken: response.accessToken,
        })
      );
      show({ message:nomenclature.SIGN_IN_SUCCESSFUL_MESSAGE,title:nomenclature.SIGN_IN_SUCCESSFUL_TITLE, type: "success" });

    } catch (error: any) {
      console.error("Login error:", error);
      show({title: "Login Failed", message: error?.data?.message || "Something went wrong", type: "error" });
    }
  };

  return (
    <View style={styles.container}>
      <PrimaryInput
        label={`${nomenclature.EMAIL} / ${nomenclature.USERNAME}`}
        value={formData.username}
        error={usernameError}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(text) =>
          setFormData((prev) => ({
            ...prev,
            username: text,
          }))
        }
      />

      <PrimaryInput
        label={nomenclature.PASSWORD}
        value={formData.password}
        error={passwordError}
        secure
        type="password"
        onChangeText={(text) =>
          setFormData((prev) => ({
            ...prev,
            password: text,
          }))
        }
      />

      <TouchableOpacity onPress={() => {
        router.push("/forgot-password");
      }} style={styles.forgotText}>
        <CustomText size={font.size_14}>
          {nomenclature.FORGOT_PASSWORD}
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isDisabled}
        style={[
          buttonStyle,
          {
            opacity: isDisabled ? 0.5 : 1,
          },
        ]}
        onPress={handleSignIn}
      >
        <CustomText>
          {isLoading ? "Signing In..." : nomenclature.LOGIN}
        </CustomText>
      </TouchableOpacity>

      <SocialFooter signInWithGoogle={googleSignIn} />
    </View>
  );
};

export default SignIn;