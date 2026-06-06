import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import PrimaryInput from "@/src/components/PrimaryInput";
import { scale } from "@/src/utils/scale";
import QuickInput from "./components/QuickInput";
import Select from "@/src/components/Select";
import CustomText from "@/src/components/CustomText";
import nomenclature from "@/src/constants/nomenclature";
import CheckList from "./components/CheckList";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { primaryButtonStyle } from "@/src/constants/styles";
import { useStyles } from "./styles/SetBudget";
import { quickInputs } from "@/src/constants/constant";
import { useAddBudgetMutation } from "@/src/services/budgetApi";
import { useGetCategoriesQuery } from "@/src/services/categoryApi";
import { normalizeError } from "@/src/utils/error";
import { useRouter } from "expo-router";
import { CATEGORY_MAPPING } from "../transactions/constants";
import { useToast } from "@/src/hooks/ToastContextProvider";

const SetCategoryBudget = () => {
  const { themePalette } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");
  const [name, setName] = useState("");
  const [addBudget, { isLoading }] = useAddBudgetMutation();
  const styles = useStyles();
  interface ItemProps {
    label: string;
    isChecked: boolean;
  }
  const ref = useRef<TextInput>(null);
  const [amount, setAmount] = useState("");
  const router = useRouter();
  const { data, error } = useGetCategoriesQuery({});
  if (error) {
    console.log("API error", error);
    throw normalizeError(error as Error);
  }
  const { show } = useToast();

  const defaultCategories = [
    {
      label: "Groceries",
      isChecked: false,
    },
    {
      label: "Transportation",
      isChecked: false,
    },
    {
      label: "Health & Insurance",
      isChecked: false,
    },
    {
      label: "Entertainment",
      isChecked: false,
    },
    {
      label: "Savings",
      isChecked: false,
    },
    {
      label: "Debt",
      isChecked: false,
    },
    {
      label: "Miscellaneous",
      isChecked: false,
    },
    {
      label: "Utilities & Bills",
      isChecked: false,
    },
    {
      label: "Housing",
      isChecked: false,
    },
  ];
  const [categories, setCategories] = useState<String[]>([
    ...defaultCategories,
  ]);
  const disabled =
    isLoading ||
    categories?.filter((item) => item?.isChecked)?.length === 0 ||
    name?.trim() === "" ||
    amount?.trim() === "";
  const buttonStyle = primaryButtonStyle(themePalette, disabled);
  useEffect(() => {
    if (data?.length === 0) return;

    const moreCategories =
      data?.map((cat) => {
        return { label: cat.name, isChecked: false };
      }) || [];

    setCategories([...defaultCategories, ...moreCategories]);
  }, [data]);
  const toggleCategory = (index: number) => {
    setCategories((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item,
      ),
    );
  };

  const handleAddBudget = () => {
    const selectedCategories = categories
      .filter((item) => item.isChecked)
      .map((item) => CATEGORY_MAPPING[item.label] ?? item.label);
    console.log("adding budget", {
      amount,
      period: selectedPeriod,
      category: selectedCategories,
      name,
    });
    show({ message:nomenclature.ADD_BUDGET_SUCCESSFUL_MESSAGE,title:nomenclature.ADD_BUDGET_SUCCESSFUL_TITLE, type: "success" });
    router.back();
    addBudget({
      amount,
      period: selectedPeriod,
      category: selectedCategories,
      name,
      spent: 0,
    });
  };
  return (
    <ScrollView style={styles.container}>
      <PrimaryInput
        label="Name"
        value={name}
        error=""
        placeholder="Give a name to the budget"
        onChangeText={setName}
        containerStyle={{ marginBottom: scale(20) }}
      />
      <PrimaryInput
        label="Amount"
        value={amount}
        keyboardType="numeric"
        error=""
        placeholder="0.00"
        onChangeText={setAmount}
        ref={ref}
      />
      <View
        style={{
          flexDirection: "row",
          columnGap: scale(5),
          marginTop: scale(10),
        }}
      >
        {quickInputs.map((item) => (
          <QuickInput
            key={item}
            numberToBeAdded={item}
            onPress={() => setAmount((prev) => String(Number(prev) + item))}
          />
        ))}
      </View>
      <CustomText style={styles.label}>{nomenclature.PERIOD}</CustomText>
      <Select
        label="Period"
        currentSelectedItem={selectedPeriod}
        values={["Weekly", "Monthly", "Yearly"]}
        onSelect={(selectedItem) => setSelectedPeriod(selectedItem)}
        style={styles.selectContainer}
      />
      <CustomText style={styles.label}>{nomenclature.CATEGORY}</CustomText>
      <CheckList items={categories} onToggle={toggleCategory} />
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          handleAddBudget();
        }}
        style={[buttonStyle, { marginTop: scale(35) }]}
      >
        <CustomText>{nomenclature.SAVE_BUDGET}</CustomText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SetCategoryBudget;
