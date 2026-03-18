import { StyleSheet, Text, View } from "react-native";
import { useRef } from "react";
import { scale } from "../utils/scale";
import { useTheme } from "../hooks/ThemeContextProvider";
import SelectDropdown from "react-native-select-dropdown";
import { CustomIcon } from "./CustomIcon";
import CustomText from "./CustomText";
import font from "../constants/font";

interface SelectProps {
  values: string[];
  label: string;
  onSelect: (selectedItem: string, index: number) => void;
}
const Select: React.FC<SelectProps> = ({ label, values, onSelect }) => {
  const { themePalette } = useTheme();
  const selectRef = useRef<SelectDropdown | null>(null);
  return (
    <SelectDropdown
      ref={selectRef}
      data={values}
      onSelect={(selectedItem, index) => {
        onSelect(selectedItem, index);        
      }}
      onFocus={()=>{
        selectRef.current?.reset();
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: scale(10),
              backgroundColor: themePalette.background,
              paddingHorizontal: scale(14),
              paddingVertical: scale(7),
              borderRadius: scale(8),
            }}
          >
            <CustomText
              size={font.size_12}
              color={
                selectedItem
                  ? themePalette.secondaryText
                  : themePalette.inputText2
              }
            >
              {selectedItem || label}
            </CustomText>
            <CustomIcon
              size={scale(20)}
              color={themePalette.tabIconDefault}
              type="Entypo"
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
