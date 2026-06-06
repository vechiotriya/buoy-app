import { KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import React, { useMemo, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import useStyles from "./styles/SignUpStyles";

import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { useGoogleAuth } from "@/src/hooks/useGoogleAuth";

import PrimaryInput from "@/src/components/PrimaryInput";
import CustomText from "@/src/components/CustomText";
import SocialFooter from "./SocialFooter";

import nomenclature from "@/src/constants/nomenclature";
import { primaryButtonStyle } from "@/src/constants/styles";

import { authApi } from "@/src/services/authApi";
import { storage } from "@/src/services/storage";

import { loggedIn } from "@/src/store/slices/authSlice";

import { trimFields } from "@/src/utils/misc";
import { useToast } from "@/src/hooks/ToastContextProvider";

const SignUp = () => {
  const { themePalette } = useTheme();

  const styles = useStyles(themePalette);
  const buttonStyle = primaryButtonStyle(themePalette);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [signUp, { isLoading }] = authApi.useSignUpMutation();
  const [signIn] = authApi.useSignInMutation();

  const { signIn: googleSignIn } = useGoogleAuth();
  const balance = storage.getNumber("initialBalance") ?? 0;
  const { show } = useToast();

  const cleanedData = useMemo(() => {
    return trimFields(formData);
  }, [formData]);

  const emailError = useMemo(() => {
    if (!cleanedData.email) return "";

    const emailRegex = /^\S+@\S+\.\S+$/;

    return emailRegex.test(cleanedData.email) ? "" : "Enter a valid email";
  }, [cleanedData.email]);

  const passwordError = useMemo(() => {
    if (!cleanedData.password) return "";

    return cleanedData.password.length >= 6
      ? ""
      : "Password must be at least 6 characters";
  }, [cleanedData.password]);

  const usernameError = useMemo(() => {
    if (!cleanedData.username) return "";

    return cleanedData.username.length >= 3
      ? ""
      : "Username must be at least 3 characters";
  }, [cleanedData.username]);

  const fullNameError = useMemo(() => {
    if (!cleanedData.fullName) return "";

    return cleanedData.fullName.length >= 2 ? "" : "Enter your full name";
  }, [cleanedData.fullName]);

  const isDisabled =
    isLoading ||
    !cleanedData.fullName ||
    !cleanedData.username ||
    !cleanedData.email ||
    !cleanedData.password ||
    !!emailError ||
    !!passwordError ||
    !!usernameError ||
    !!fullNameError;

  const handleSignUp = async () => {
    try {
      const payload = {
        ...cleanedData,
        balance,
      };

      await signUp(payload).unwrap();

      storage.remove("initialBalance");

      const loginResponse = await signIn({
        username: payload.username,
        password: payload.password,
      }).unwrap();

      dispatch(
        loggedIn({
          user: payload.username,
          accessToken: loginResponse.accessToken,
        }),
      );

      show({ message:nomenclature.SIGN_UP_SUCCESSFUL_MESSAGE,title:nomenclature.SIGN_UP_SUCCESSFUL_TITLE, type: "success" });
    } catch (error: any) {
      console.error("Sign-up error:", error);
      show({title: "Sign Up Failed", message: error?.data?.message || "Something went wrong", type: "error" });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <PrimaryInput
          label={nomenclature.FULLNAME}
          value={formData.fullName}
          error={fullNameError}
          placeholder="John Doe"
          autoCapitalize="words"
          returnKeyType="next"
          onChangeText={(text) =>
            setFormData((prev) => ({
              ...prev,
              fullName: text,
            }))
          }
        />

        <PrimaryInput
          label={nomenclature.USERNAME}
          value={formData.username}
          error={usernameError}
          placeholder="johndoe"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) =>
            setFormData((prev) => ({
              ...prev,
              username: text,
            }))
          }
        />

        <PrimaryInput
          label={nomenclature.EMAIL}
          value={formData.email}
          error={emailError}
          placeholder="john@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onChangeText={(text) =>
            setFormData((prev) => ({
              ...prev,
              email: text,
            }))
          }
        />

        <PrimaryInput
          label={nomenclature.PASSWORD}
          value={formData.password}
          error={passwordError}
          placeholder="••••••••"
          secure
          type="new-password"
          returnKeyType="done"
          onSubmitEditing={handleSignUp}
          onChangeText={(text) =>
            setFormData((prev) => ({
              ...prev,
              password: text,
            }))
          }
        />

        <TouchableOpacity
          disabled={isDisabled}
          style={[
            buttonStyle,
            {
              opacity: isDisabled ? 0.5 : 1,
            },
          ]}
          onPress={handleSignUp}
        >
          <CustomText>
            {isLoading ? "Creating Account..." : nomenclature.SIGN_UP}
          </CustomText>
        </TouchableOpacity>

        <SocialFooter signInWithGoogle={googleSignIn} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
