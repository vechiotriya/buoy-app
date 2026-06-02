import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo, useState } from "react";
import PrimaryInput from "@/src/components/PrimaryInput";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { primaryButtonStyle } from "@/src/constants/styles";
import { scale } from "@/src/utils/scale";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import nomenclature from "@/src/constants/nomenclature";
import { useResetPasswordMutation } from "@/src/services/authApi";
import { useRouter } from "expo-router";

type UpdatePasswordProps = {
  resetToken: string;
};
const UpdatePassword = ({ resetToken }: UpdatePasswordProps) => {
  const { themePalette } = useTheme();
  const [newPassword, setNewPassword] = useState("");
  const buttonStyle = primaryButtonStyle(themePalette);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
    const passwordError = useMemo(() => {
      if (!newPassword) return "";
      if (newPassword.length < 6)
        return "Password must be at least 6 characters";
  
      return "";
    }, [newPassword]);
  
    const isDisabled =
      !newPassword ||
      !!passwordError;
  return (
    <View>
      <PrimaryInput
        label="New Password"
        placeholder="Enter your new password"
        type="new-password"
        secure
        error={passwordError}
        value={newPassword}
        onChangeText={(text) => setNewPassword(() => text)}
      />
      <TouchableOpacity
        disabled={isDisabled}
        style={[
          buttonStyle,
          {
            opacity: isDisabled ? 0.5 : 1,
            marginTop: scale(20),
          },
        ]}
        onPress={() =>{
            console.log("Submit password",{ newPassword, resetToken });
            
            resetPassword({ newPassword, resetToken }).then((response) => {
              if (!response.error) {
                // Password reset successful, you can navigate the user to the login screen or show a success message
                console.log("Password reset successful");
              } else {
                // Handle error case, show an error message to the user
                console.error("Password reset failed", response.error);
              }
            }).catch((error) => {
                // Handle any unexpected errors
                console.error("Password reset failed", error);
            }).finally(() => {
              router.back();
            })
            }}
      >
        <CustomText size={font.size_14}>{nomenclature.CHANGE_PASSWORD}</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({});
