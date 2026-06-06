import {
  Keyboard,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import {
  defaultCategories,
  keypadLayout,
  sideButtons,
} from "@/src/constants/constant";
import DatePicker, { SingleOutput } from "react-native-neat-date-picker";
import { CustomIcon } from "@/src/components/CustomIcon";
import PrimaryInput from "@/src/components/PrimaryInput";
import { BlurView } from "expo-blur";
import nomenclature from "@/src/constants/nomenclature";
import { scale } from "@/src/utils/scale";
import Select from "@/src/components/Select";
import KeypadButton from "@/src/features/home/components/KeypadButton";
import { primaryButtonStyle } from "@/src/constants/styles";
import { createDateString } from "@/src/utils/misc";
import { useAddTransactionMutation } from "@/src/services/transactionApi";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
} from "@/src/services/categoryApi";
import { normalizeError } from "@/src/utils/error";
import { CATEGORY_MAPPING } from "@/src/features/transactions/constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch } from "react-redux";
const AddTransaction = () => {
  const { type } = useLocalSearchParams<{ type: string }>();
  const [amount, setAmount] = useState<string>();
  const [comment, setComment] = useState<string>();
  const [date, setDate] = useState<string>(createDateString(new Date()));
  const { themePalette } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState<string | undefined>();
  const [newCategory, setNewCategory] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(false);
  const buttonStyle = primaryButtonStyle(themePalette);
  const [addTransaction, { isSuccess }] = useAddTransactionMutation();
  const [addCategory, { isSuccess: isCategorySuccess }] =
    useAddCategoryMutation();
  const { data, error } = useGetCategoriesQuery({});
  const router = useRouter();
  const dispatch = useDispatch();
  if (error) {
    console.log("API error", error);
    throw normalizeError(error as Error);
  }
  const [categories, setCategories] = useState([
    ...defaultCategories,
    "Add new category",
  ]);

  useEffect(() => {
    if (!data) return;

    const moreCategories = data.map((cat) => cat.name) || [];

    setCategories([
      ...defaultCategories,
      ...moreCategories,
      "Add new category",
    ]);
  }, [data]);

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
    console.log(output);

    setDate((prev) => output.dateString ?? prev);
  };
  const clear = () => {
    setAmount("0");
  };
  const submit = async () => {
    // const dateString = createDateString(new Date(date));
    console.log({
      amount: parseFloat(amount ?? "0"),
      transactionType: type.slice(0, 1).toUpperCase() + type.slice(1),
      category: CATEGORY_MAPPING[category] ?? null,
      purpose: comment ?? null,
      transactionDate: date,
    });
    addTransaction({
      amount: parseFloat(amount ?? "0"),
      transactionType: type.slice(0, 1).toUpperCase() + type.slice(1),
      category: CATEGORY_MAPPING[category] ?? null,
      purpose: comment,
      transaction_date: date,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        router.back();
      });
    return;
  };

  const handleAddCategory = (newCategory: string) => {
    console.log("Adding new category", newCategory);

    addCategory({ name: newCategory, budget: 0 })
      .unwrap()
      .then((res) => {
        console.log("Added category:", res);
        setCategory(newCategory);
      })
      .catch((err) => {
        console.log("Error adding category:", err);
      })
      .finally(() => {
        setShowAddModal(false);
        setNewCategory("");
      });
  };
  const keypadAction = (operation: string) => {
    if (operation == "backspace") return backspace();
    if (operation == "calendar-month") return openCalendar();
    if (operation == "trash-can") return clear();
    if (operation == "check") return submit();
  };
  return (
    <View style={{ paddingHorizontal: scale(16), paddingTop: scale(16) }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CustomText
          variant="bold"
          color={themePalette.inputText}
          size={font.size_14}
        >{`Date: ${new Date(date || "").toDateString().split(" ").slice(1).join(" ")}`}</CustomText>
        {type === "expense" && (
          <View
            style={{
              backgroundColor: themePalette.secondary,
              width: scale(190),
              height: scale(36),
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              borderRadius: scale(23),
              paddingLeft: scale(9),
            }}
          >
            <CustomIcon
              name={"shapes"}
              color={themePalette.text}
              size={scale(16)}
              type="FontAwesome6"
            />
            <Select
              label="Select Category"
              currentSelectedItem={category}
              onSelect={(itemValue, itemIndex) => {
                if (itemValue === "Add new category") {
                  setShowAddModal(true);
                } else {
                  setCategory(itemValue);
                }
              }}
              values={categories}
              textStyle={{ color: themePalette.text }}
              style={{ backgroundColor: "transparent" }}
            ></Select>
          </View>
        )}
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
          placeholder={type === "expense" ? "What did you spend on? Enter here" : "Who or what paid you? Enter here"}
          value={comment}
          placeholderTextColor={themePalette.inputText2}
          maxLength={50}
          onChangeText={(text) => {
            setComment(text);
          }}
          style={{
            fontSize: font.size_14,
            borderWidth: 0,
            fontFamily: "poppins-regular",
            color: themePalette.inputText,
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
              handleAddCategory(newCategory);
            }}
          >
            <CustomText>{nomenclature.ADD_CATEGORY}</CustomText>
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
          columnGap: scale(4),
        }}
      >
        <View style={{ rowGap: scale(4) }}>
          {keypadLayout?.map((row) => {
            return (
              <View
                key={row.toString()}
                style={{
                  flexDirection: "row",
                  columnGap: scale(4),
                  justifyContent: "center",
                }}
              >
                {row?.map((rowItem) => {
                  if (typeof rowItem == "string" || rowItem == null) {
                    return (
                      <KeypadButton
                        key={rowItem}
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
                      key={rowItem.icon.toString()}
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
            rowGap: scale(4),
            height: scale(363),
          }}
        >
          {sideButtons.map((button) => {
            return (
              <KeypadButton
                key={button.icon.toString()}
                backgroundColor={button.color}
                label={button.icon}
                icon={button.icon}
                style={button.icon == "check" ? { height: scale(170) } : {}}
                onPress={() => {
                  keypadAction(button.icon);
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default AddTransaction;
