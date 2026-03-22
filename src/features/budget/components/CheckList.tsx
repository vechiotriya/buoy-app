import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { scale } from "@/src/utils/scale";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import { CustomIcon } from "@/src/components/CustomIcon";

interface CheckListProps {
  items: Item[];
  onToggle: (index: number) => void;
}
interface Item {
  label: string;
  isChecked: boolean;
  onPress: () => void;
}

const Item: React.FC<Item> = ({ label, isChecked, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: scale(30),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: scale(15),
        borderRadius: scale(29),
        backgroundColor: isChecked ? "#98DBEA" : "transparent",
        borderWidth: isChecked ? 0 : 1,
        borderColor: "#FFFF",
        marginRight:scale(5)
      }}
    >
      {isChecked && (
        <CustomIcon name="check" type="Feather" size={scale(16)} color="#fff"/>
      )}
      <CustomText size={font.size_12} style={{marginLeft:scale(5)}}>{label}</CustomText>
    </TouchableOpacity>
  );
};
const CheckList: React.FC<CheckListProps> = ({ items, onToggle }) => {
  return (
    <FlatList horizontal={true} style={{ flexDirection: "row", columnGap: scale(5) }}
    data={items}
    showsHorizontalScrollIndicator={false}
    renderItem={({ item, index }) => <Item {...item} onPress={() => onToggle(index)} />}
    />
  );
};

export default CheckList;

const styles = StyleSheet.create({});
