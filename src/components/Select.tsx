import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React, { forwardRef, useRef } from "react";
import { scale } from "../utils/scale";
import { useTheme } from "../hooks/ThemeContextProvider";
import SelectDropdown from "react-native-select-dropdown";
import { CustomIcon } from "./CustomIcon";
import CustomText from "./CustomText";
import font from "../constants/font";

interface SelectProps {
  values: string[];
  currentSelectedItem: string | undefined;
  label?: string;
  onSelect: (selectedItem: string | undefined, index: number) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}
const Select: React.FC<SelectProps> = ({
  label,
  values,
  onSelect,
  style,
  textStyle,
  currentSelectedItem,
}) => {
  const { themePalette } = useTheme();

  return (
    <SelectDropdown
      key={currentSelectedItem ?? "empty"}
      data={values}
      onSelect={(selectedItem, index) => {
        if (selectedItem === currentSelectedItem) {
          onSelect(undefined as any, -1); // clear selection
          return;
        }
        onSelect(selectedItem, index);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: scale(10),
                backgroundColor: themePalette.background,
                paddingHorizontal: scale(14),
                paddingVertical: scale(10),
                borderRadius: scale(9),
              },
              style,
            ]}
          >
            <CustomText
              size={font.size_12}
              color={themePalette.inputText2}
              style={{ height: scale(15), ...textStyle }}
            >
              {currentSelectedItem || label}
            </CustomText>
            <CustomIcon
              size={scale(20)}
              color={themePalette.tabIconDefault}
              type="Entypo"
              iconStyle={{ height: scale(20) }}
              name={isOpened ? "chevron-up" : "chevron-down"}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...(isSelected && { backgroundColor: themePalette.secondary }),
              padding: scale(10),
            }}
          >
            <Text>{item}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={{
        borderRadius: scale(8),
        backgroundColor: themePalette.background,
      }}
    />
  );
};

export default Select;

const styles = StyleSheet.create({});
