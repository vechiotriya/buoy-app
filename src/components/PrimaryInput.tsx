import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import React, { forwardRef } from "react";
import CustomText from "./CustomText";
import font from "../constants/font";
import { AppTheme } from "../constants/Colors";
import { useTheme } from "../hooks/ThemeContextProvider";
import { scale } from "../utils/scale";

interface PrimaryInputProps {
  label?: string;
  value: string;
  error?: string;
  secure?: boolean;
  style?: TextInputProps;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
}

const PrimaryInput = forwardRef<TextInput, PrimaryInputProps>(
  (
    {
      label,
      value,
      error,
      secure,
      style,
      placeholder,
      onChangeText,
      onSubmitEditing,
      returnKeyType,
    },
    ref
  ) => {
    const { themePalette } = useTheme();
    const styles = useStyles(themePalette);

    return (
      <View style={styles.container}>
        {label && <CustomText>{label}</CustomText>}

        <TextInput
          ref={ref}
          value={value}
          style={[styles.inputText, style]}
          placeholder={placeholder}
          secureTextEntry={secure}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
        />
      </View>
    );
  }
);

export default PrimaryInput;

const useStyles = (theme: AppTheme) =>
  StyleSheet.create({
    inputText: {
      backgroundColor: theme.background,
      fontFamily: "poppins-regular",
      fontSize: font.size_14,
      color: theme.inputText,
      paddingLeft: scale(16),
      paddingVertical: scale(5),
      borderRadius: scale(12),
      minHeight: scale(45),
      width: scale(360),
    },
    container: {
      justifyContent: "center",
      marginBottom: scale(24),
    },
  });
