import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { Picker } from "@react-native-picker/picker";
import { keypadLayout, sideButtons } from "@/src/constants/constant";
import KeypadButton from "./KeypadButton";
import DatePicker, { SingleOutput } from "react-native-neat-date-picker";
import { CustomIcon } from "@/src/components/CustomIcon";
import PrimaryInput from "@/src/components/PrimaryInput";
import { BlurView } from "expo-blur";
import { primaryButtonStyle } from "@/src/constants/styles";
import nomenclature from "@/src/constants/nomenclature";

interface AddTransactionSheetProps {
  type: "expense" | "income";
  closeSheet: Function;
}

const AddTransactionSheet = ({
  type,
  closeSheet,
}: AddTransactionSheetProps) => {
  const [amount, setAmount] = useState<string>();
  const [comment, setComment] = useState<string>();
  const [date, setDate] = useState<Date>(new Date());
  const { themePalette } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [categories, setCategories] = useState([
    "Housing",
    "Utilities & Bills",
    "Groceries",
    "Transportation",
    "Health & Insurance",
    "Entertainment",
    "Savings",
    "Debt",
    "Miscellaneous",
    "Add new category",
  ]);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const buttonStyle = primaryButtonStyle(themePalette);

  const backspace = () => {
    setAmount((prev) => prev?.slice(0, prev.length - 1));
  };
  const openCalendar = () => {
    setShowDatePicker(true);
  };
  const onCancel = () => {
    setShowDatePicker(false);
  };
  const onConfirm = (output: SingleOutput) => {
    setShowDatePicker(false);
    setDate((prev) => output.date ?? prev);
  };
  const clear = () => {
    setAmount("0");
  };
  const submit = () => {
    closeSheet();
  };
  const keypadAction = (operation: string) => {
    if (operation == "backspace") return backspace();
    if (operation == "calendar-month") return openCalendar();
    if (operation == "trash-can") return clear();
    if (operation == "check") return submit();
  };
  return (
    <BottomSheetView style={{ paddingHorizontal: 16, paddingBottom: "5%" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CustomText
          variant="bold"
          color={themePalette.inputText}
          size={font.size_14}
        >{`Date: ${date.toDateString().split(" ").slice(1).join(" ")}`}</CustomText>
     {type==="expense" &&   <View
          style={{
            backgroundColor: themePalette.secondary,
            width: 170,
            height: 36,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderRadius: 23,
            paddingLeft: 12,
          }}
        >
          <CustomIcon
            name={"shapes"}
            color={themePalette.text}
            size={16}
            type="FontAwesome6"
          />
          <Picker
            mode="dropdown"
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue === "add-new-category") {
                setShowAddModal(true);
              } else {
                setCategory(itemValue);
              }
            }}
            style={{
              fontFamily: "poppins-bold",
              color: themePalette.text,
              flex: 1,
            }}
            dropdownIconColor={themePalette.text}
            dropdownIconRippleColor={themePalette.text}
          >
            {categories.map((cat) => (
              <Picker.Item
                key={cat}
                label={cat}
                value={cat.toLowerCase().replace(/\s+/g, "-")}
              />
            ))}
          </Picker>
        </View>}
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 30,
        }}
      >
        <CustomText color={themePalette.inputText}>
          {type.at(0)?.toUpperCase() + type.substring(1)}
        </CustomText>
        <View style={{ flexDirection: "row" }}>
          <CustomText
            color={themePalette.inputText2}
            size={font.size_32}
            style={{ textAlignVertical: "center" }}
          >
            ₹
          </CustomText>
          <TextInput
            placeholder="0"
            placeholderTextColor={themePalette.secondaryText}
            value={amount}
            showSoftInputOnFocus={false}
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericOnly = text.replace(/[^0-9.]/g, "");
              setAmount(numericOnly);
            }}
            style={{
              color: themePalette.secondaryText,
              fontSize: font.size_50,
              borderWidth: 0,
              fontFamily: "poppins-bold",
            }}
            onFocus={() => {
              Keyboard.dismiss();
            }}
            contextMenuHidden
          ></TextInput>
        </View>
        <TextInput
          placeholder="Add a comment..."
          value={comment}
          maxLength={50}
          onChangeText={(text) => {
            setComment(text);
          }}
          style={{
            fontSize: font.size_14,
            borderWidth: 0,
            fontFamily: "poppins-regular",
          }}
        ></TextInput>
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        style={{ flex: 1 }}
        visible={showAddModal}
      >
        <BlurView
          intensity={99}
          tint="dark"
          style={[
            StyleSheet.absoluteFill,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <PrimaryInput
            placeholder="Category Name"
            onChangeText={(text) => {
              setNewCategory(text);
            }}
            value={newCategory}
          />
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => {
              setCategory(newCategory.toLowerCase().replace(/\s+/g, "-"));
              setCategories((prev) => [...prev, newCategory]);
              setNewCategory("");
              setShowAddModal(false);
            }}
          >
            <CustomText>{nomenclature.add_category}</CustomText>
          </TouchableOpacity>
        </BlurView>
      </Modal>
      <DatePicker
        isVisible={showDatePicker}
        mode={"single"}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 5,
        }}
      >
        <View style={{ rowGap: 4 }}>
          {keypadLayout.map((row) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 4,
                  justifyContent: "center",
                }}
              >
                {row.map((rowItem) => {
                  if (typeof rowItem == "string" || rowItem == null) {
                    return (
                      <KeypadButton
                        backgroundColor={themePalette.keypadButton}
                        label={rowItem ?? ""}
                        onPress={() => {
                          setAmount((prev) => {
                            console.log(rowItem, prev);

                            if (
                              (prev == "0" || prev == undefined || !prev) &&
                              rowItem !== "."
                            )
                              prev = "";
                            if (
                              (prev === "." || prev?.includes(".")) &&
                              rowItem === "."
                            )
                              return prev;
                            else return prev + rowItem;
                          });
                        }}
                      />
                    );
                  }
                  return (
                    <KeypadButton
                      backgroundColor={rowItem.color}
                      label={rowItem.icon}
                      icon={rowItem.icon}
                      onPress={() => {
                        keypadAction(rowItem.icon);
                      }}
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: "column",
            rowGap: 4,
            justifyContent: "center",
          }}
        >
          {sideButtons.map((button) => {
            return (
              <KeypadButton
                backgroundColor={button.color}
                label={button.icon}
                icon={button.icon}
                style={button.icon == "check" ? { height: 168 } : {}}
                onPress={() => {
                  keypadAction(button.icon);
                }}
              />
            );
          })}
        </View>
      </View>
    </BottomSheetView>
  );
};

export default AddTransactionSheet;

const styles = StyleSheet.create({});
