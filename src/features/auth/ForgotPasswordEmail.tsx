import { Alert, Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import PrimaryInput from "@/src/components/PrimaryInput";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import { primaryButtonStyle } from "@/src/constants/styles";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import nomenclature from "@/src/constants/nomenclature";
import { scale } from "@/src/utils/scale";
import { useForgotPasswordMutation } from "@/src/services/authApi";

type ForgotPasswordEmailProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
const ForgotPasswordEmail = ({
  email,
  setEmail,
  setStep,
}: ForgotPasswordEmailProps) => {
  const { themePalette } = useTheme();
  const buttonStyle = primaryButtonStyle(themePalette);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const emailError = useMemo(() => {
      if (!email) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(email)) return "Email is invalid";
      return "";
    }, [email]);
  const isDisabled = !email || isLoading||!!emailError;

  return (
    <View>
      <PrimaryInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(() => text)}
        error={emailError}
      />
      <TouchableOpacity
        style={[
          buttonStyle,
          {
            opacity: isDisabled ? 0.5 : 1,
            marginTop: scale(20),
          },
        ]}
        disabled={isDisabled}
        onPress={() => {
          Keyboard.dismiss();
          forgotPassword({ email }).unwrap().then((response) => {
            if (response.message) {
              setStep(1);
              Alert.alert("Success", response.message);
            }
          }).catch((error) => {
            const err=JSON.parse(error?.data)?.message;
            console.log("Error",err);
            
            Alert.alert("Error", err || "Something went wrong");
          });
        }}
      >
        <CustomText size={font.size_14}>
          {nomenclature.SEND_EMAIL}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordEmail;

const styles = StyleSheet.create({});
