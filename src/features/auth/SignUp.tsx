import {
  Alert,
  AlertButton,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import useStyles from "./styles/SignUpStyles";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import PrimaryInput from "@/src/components/PrimaryInput";
import nomenclature from "@/src/constants/nomenclature";
import CustomText from "@/src/components/CustomText";
import { primaryButtonStyle } from "@/src/constants/styles";
import SocialFooter from "./SocialFooter";
import { authApi } from "@/src/services/authApi";
import { useDispatch } from "react-redux";
import { loggedIn } from "@/src/store/slices/authSlice";
import { trimFields } from "@/src/utils/misc";
import { ScrollView } from "react-native-gesture-handler";

const SignUp = () => {
  const { themePalette } = useTheme();
  const styles = useStyles(themePalette);
  const buttonStyle = primaryButtonStyle(themePalette);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [signUp, { isLoading, error }] = authApi.useSignUpMutation();
  const dispatch = useDispatch();
  const [signIn] = authApi.useSignInMutation();

  const handleSignUp = async (data: any) => {
    try {
      const response = await signUp(data).unwrap(); // unwrap throws on error
      console.log("Sign-up successful:", response);
      const title = nomenclature.SIGN_UP_SUCCESSFUL_TITLE;
      const message = nomenclature.SIGN_UP_SUCCESSFUL_MESSAGE;
      const buttons: AlertButton[] = [
        {
          text: nomenclature.SIGN_UP_SUCCESSFUL_BUTTON,
          onPress: () => {
            signIn({
              username: formData.username,
              password: formData.password,
            })
              .unwrap()
              .then((res) => {
                console.log("Sign-in successful",res);
                dispatch(
                  loggedIn({
                    user: formData.username,
                    accessToken: res.accessToken,
                  }),
                );
              })
              .catch((error) => {
                console.error("Sign-in error:", error);
              });
          },
        },
      ];
      if (Platform.OS === "ios") {
        Alert.prompt(title, message, buttons);
      } else {
        Alert.alert(title, message, buttons);
      }
    } catch (err) {
      console.error("Sign-up error:", `${err}`);
      if(Platform.OS === "ios") Alert.prompt('Sign up error'); else Alert.alert('Sign up error');
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
      >
        <PrimaryInput
          label={nomenclature.FULLNAME}
          value={formData.fullName}
          error=""
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, fullName: text }))
          }
        />
        <PrimaryInput
          label={nomenclature.USERNAME}
          value={formData.username}
          error=""
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, username: text }))
          }
        />
        <PrimaryInput
          label={nomenclature.EMAIL}
          value={formData.email}
          error=""
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
        />
        <PrimaryInput
          label={nomenclature.PASSWORD}
          value={formData.password}
          error=""
          secure
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, password: text }))
          }
        />
        <TouchableOpacity
          disabled={isLoading}
          style={buttonStyle}
          onPress={() => {
            handleSignUp(trimFields(formData));
          }}
        >
          <CustomText>{nomenclature.SIGN_UP}</CustomText>
        </TouchableOpacity>
        <SocialFooter />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
