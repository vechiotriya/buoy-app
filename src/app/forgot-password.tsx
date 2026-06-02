import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ForgotPasswordEmail from "../features/auth/ForgotPasswordEmail";
import ResetOtp from "../features/auth/ResetOtp";
import UpdatePassword from "../features/auth/UpdatePassword";
import { useTheme } from "../hooks/ThemeContextProvider";
import CustomText from "../components/CustomText";
import { useLocalSearchParams } from "expo-router";

const ForgotPassword = () => {
  const { userEmail } = useLocalSearchParams();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState(userEmail || "");
  const [resetToken, setResetToken] = useState("");
  const { themePalette } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: themePalette.backgroundGradient2,
      }}
    >
      <CustomText
        variant="bold"
        size={24}
        color={themePalette.text}
        style={{ marginBottom: 20 }}
      >
        {userEmail ? "Reset Password" : "Forgot Password"}
      </CustomText>
      {step === 0 && (
        <ForgotPasswordEmail
          email={email}
          setEmail={setEmail}
          setStep={setStep}
        />
      )}
      {step === 1 && (
        <ResetOtp
          email={email}
          setStep={setStep}
          setResetToken={setResetToken}
        />
      )}
      {step === 2 && <UpdatePassword resetToken={resetToken} />}
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
