import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { scale } from "@/src/utils/scale";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { primaryButtonStyle } from "@/src/constants/styles";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import nomenclature from "@/src/constants/nomenclature";
import { useResetOtpVerificationMutation } from "@/src/services/authApi";
import { AppTheme } from "@/src/constants/Colors";
import { useToast } from "@/src/hooks/ToastContextProvider";

type ResetOtpProps = {
  email: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setResetToken: React.Dispatch<React.SetStateAction<string>>;
};
const ResetOtp = ({ email, setStep, setResetToken }: ResetOtpProps) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const { themePalette } = useTheme();
  const styles = useStyles(themePalette);
  const buttonStyle = primaryButtonStyle(themePalette);
  const isDisabled = otp.some((digit) => digit === "");
  const { show } = useToast();

  const [resetOtpVerification, { isLoading }] =
    useResetOtpVerificationMutation();
  const inputRefs = useRef<TextInput[]>([]);
  return (
    <View style={styles.container}>
      <CustomText>{nomenclature.ENTER_OTP}</CustomText>
      <View style={styles.inputContainer}>
        {Array(6)
          .fill("")
          .map((_, index) => (
            <TextInput
              ref={(ref) => (inputRefs.current[index] = ref)}
              key={index}
              style={styles.otpInput}
              value={otp[index]}
              keyboardType="numeric"
              onChangeText={(text) => {
                const newOtp = [...otp];
                newOtp[index] = text;
                setOtp(() => newOtp);
                if (text && index < 5) {
                  inputRefs.current[index + 1]?.focus();
                }
              }}
              onKeyPress={({ nativeEvent }) => {
                if (
                  nativeEvent.key === "Backspace" &&
                  !otp[index] &&
                  index > 0
                ) {
                  inputRefs.current[index - 1]?.focus();
                }
              }}
              maxLength={1}
            />
          ))}
      </View>
      <TouchableOpacity
        style={[
          buttonStyle,
          {
            opacity: isDisabled ? 0.5 : 1,
            marginTop: scale(30),
          },
        ]}
        onPress={() => {
          resetOtpVerification({ email, otp: otp.join("") })
            .then((response) => {
              console.log("kwaa", JSON.parse(response?.error?.data)?.error);

              if (!("error" in response)) {
                setResetToken(() => response.data.resetToken);
                setStep(2);
              } else {
                const err = JSON.parse(response?.error?.data)?.error;
                console.log("Error", err);
                show({
                  title: "Verification Failed",
                  message: err || "Something went wrong",
                  type: "error",
                });
              }
            })
            .catch((error) => {
              const err = JSON.parse(error?.data)?.message;
              console.log("Error", err);
              show({
                title: "Verification Failed",
                message: err || "Something went wrong",
                type: "error",
              });
            });
        }}
      >
        <CustomText size={font.size_14}>{nomenclature.SUBMIT_OTP}</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default ResetOtp;

const useStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
    },
    inputContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      gap: scale(10),
      paddingTop: scale(20),
      marginVertical: scale(20),
    },
    otpInput: {
      width: scale(50),
      aspectRatio: 1,
      borderWidth: 1,
      borderRadius: scale(10),
      borderColor: theme.text,
      textAlign: "center",
      fontSize: font.size_18,
      color: theme.text,
    },
  });
