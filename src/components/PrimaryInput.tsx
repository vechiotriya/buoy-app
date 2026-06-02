import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  TextStyle,
  Pressable,
} from "react-native";
import React, { forwardRef } from "react";

import CustomText from "./CustomText";
import font from "../constants/font";
import { AppTheme } from "../constants/Colors";
import { useTheme } from "../hooks/ThemeContextProvider";
import { scale } from "../utils/scale";
import { CustomIcon } from "./CustomIcon";

interface PrimaryInputProps extends TextInputProps {
  label?: string;
  error?: string;
  secure?: boolean;
  style?: TextStyle;
  type?: TextInputProps["textContentType"]|TextInputProps["autoComplete"];
}

const PrimaryInput = forwardRef<TextInput, PrimaryInputProps>(
  (
    {
      label,
      value,
      error,
      secure,
      style,
      type="none",
      placeholder,
      onChangeText,
      onSubmitEditing,
      returnKeyType,
      ...rest
    },
    ref,
  ) => {
    const { themePalette } = useTheme();
    const styles = useStyles(themePalette);
    const [hide, setHide] = React.useState(secure);
    return (
      <View style={styles.container}>
        {label && <CustomText>{label}</CustomText>}
        <View
          style={[{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: themePalette.background,
            borderRadius: scale(12),
            width: scale(360),
            paddingRight: scale(12),
          }]}
        >
          <TextInput
            {...rest}
            ref={ref}
            value={value}
            placeholderTextColor={themePalette.inputText2}
            style={[styles.inputText, style]}
            placeholder={placeholder}
            autoComplete={type}
            secureTextEntry={hide}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            textContentType={type}
          />
     {(type =='password'||type=='new-password') &&  <Pressable
            onPress={() => {
              setHide((prev) => !prev);
            }}
            >
          <CustomIcon
            name={!hide ? "eye-slash" : "eye"}
            type="FontAwesome"
            size={scale(20)}
            color={themePalette.inputText2}
          />
          </Pressable>}
        </View>
        {!!error && (
          <CustomText style={styles.errorText} size={font.size_12}>
            {error}
          </CustomText>
        )}
      </View>
    );
  },
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
      minHeight: scale(45),
      borderRadius: scale(12),
      width: '80%',
    },

    errorText: {
      color: theme.negative,
      marginTop: scale(6),
      marginLeft: scale(4),
    },
  });
