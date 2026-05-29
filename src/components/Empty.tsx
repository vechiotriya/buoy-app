import { Image, StyleSheet,ViewStyle } from "react-native";
import React from "react";
import { useTheme } from "../hooks/ThemeContextProvider";
import { AppTheme } from "../constants/Colors";
import { scale } from "../utils/scale";
import { empty } from "../constants/constant";
import CustomText from "./CustomText";
import font from "../constants/font";
import { BlurView } from "expo-blur";

type Props = {
  text: string;
  style?: ViewStyle
};
const Empty: React.FC<Props> = ({ text, style }) => {
  const { themePalette } = useTheme();
  const styles = useStyles(themePalette);
  return (
    <BlurView intensity={30} tint="light" style={[styles.container,style]}>
      <Image
        source={empty}
        style={{
          width: scale(120),
          height: scale(120),
          marginBottom: scale(10),
        }}
      />
      <CustomText style={{ textAlign: "center" }} size={font.size_18}>
        {text}
      </CustomText>
    </BlurView>
  );
};

export default Empty;

const useStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      padding: scale(30),
      borderRadius: scale(16),
      width: scale(360),
      alignSelf: "center",
      overflow: "hidden",
      justifyContent: "center",
    },
  });
