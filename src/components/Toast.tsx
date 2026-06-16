import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useRef } from "react";
import { AppTheme } from "../constants/Colors";
import { useTheme } from "../hooks/ThemeContextProvider";
import { scale } from "../utils/scale";
import CustomText from "./CustomText";
import font from "../constants/font";
import { ToastState } from "../types/toast.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { primaryButtonStyle } from "../constants/styles";

const ICONS: Record<string, string> = {
  success: "🎉",
  error: "🚨",
  info: "ℹ️",
  warning: "⚠️",
};
const Toast: FC<ToastState> = ({
  visible,
  type = "success",
  message,
  title,
  action,
}) => {
  const { themePalette } = useTheme();
  const styles = useStyles(themePalette);
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;
  const buttonStyle= primaryButtonStyle(themePalette);
  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -20,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);
  return (
    <Animated.View
      pointerEvents={visible ? "auto" : "none"} 
      style={[
        styles.container,
        {
          top: insets.top + scale(300),
          bottom: insets.bottom,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <CustomText
        variant="bold"
        size={font.size_24}
        style={{ textAlign: "center", marginTop: 16,color: themePalette.primary }}
      >
        {`${ICONS[type]} ${title}`}
      </CustomText>
      <CustomText
        size={font.size_14}
        style={{ color: themePalette.inputText2, textAlign: "center",marginTop: scale(10) }}
      >
        {message}
      </CustomText>
      <Pressable
        onPress={() => {
          if (action) {
            action();
          }
          Animated.timing(opacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }).start();
        }}
        style={[buttonStyle, { alignSelf:"flex-end",marginTop: scale(10),width:scale(100) }]}
      >
        <CustomText
          variant="bold"
          size={font.size_14}
          style={{textAlign: "center" }}
        >
          Okay
        </CustomText>
      </Pressable>
    </Animated.View>
  );
};

export default Toast;

const useStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      maxHeight: scale(200),
      width:'90%',
      zIndex: 999,
      left: scale(23),
      right: 0,
      backgroundColor: theme.background,
      padding: scale(12),
      borderRadius: scale(12),
      borderWidth: 3,
      borderColor: theme.borderSecondary,
    },
  });
