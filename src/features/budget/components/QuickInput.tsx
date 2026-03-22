import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale } from "@/src/utils/scale";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { AppTheme } from "@/src/constants/Colors";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";

interface QuickInputProps {
  onPress: () => void;
  numberToBeAdded: number;
}
const QuickInput: React.FC<QuickInputProps> = ({ numberToBeAdded,onPress }) => {
  const { themePalette } = useTheme();
  const styles = useStyles(themePalette);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress();
      }}
    >
      <CustomText size={font.size_12}>{"+ " + String(numberToBeAdded)}</CustomText>
    </TouchableOpacity>
  );
};

export default QuickInput;

const useStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      borderRadius: scale(23),
      paddingHorizontal: scale(15),
      paddingVertical: scale(4),
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },
  });
