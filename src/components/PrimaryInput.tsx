import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  TextStyle,
} from "react-native";
import React, { forwardRef } from "react";

import CustomText from "./CustomText";
import font from "../constants/font";
import { AppTheme } from "../constants/Colors";
import { useTheme } from "../hooks/ThemeContextProvider";
import { scale } from "../utils/scale";

interface PrimaryInputProps extends TextInputProps {
  label?: string;
  error?: string;
  secure?: boolean;
  style?: TextStyle;
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
      ...rest
    },
    ref
  ) => {
    const { themePalette } = useTheme();
    const styles = useStyles(themePalette);

    return (
      <View style={styles.container}>
        {label && <CustomText>{label}</CustomText>}

        <TextInput
          {...rest}
          ref={ref}
          value={value}
          placeholderTextColor={themePalette.inputText2}
          style={[styles.inputText, style]}
          placeholder={placeholder}
          secureTextEntry={secure}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
        />

        {!!error && (
          <CustomText
            style={styles.errorText}
            size={font.size_12}
          >
            {error}
          </CustomText>
        )}
      </View>
    );
  }
);

export default PrimaryInput;

const useStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      marginBottom: scale(24),
    },

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

    errorText: {
      color: theme.negative,
      marginTop: scale(6),
      marginLeft: scale(4),
    },
  });