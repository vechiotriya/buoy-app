import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
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

const SetCategoryBudget = () => {
  const { themePalette } = useTheme();
  const buttonStyle = primaryButtonStyle(themePalette);
  const styles=useStyles()
  interface ItemProps {
    label: string;
    isChecked: boolean;
  }
  const ref = useRef<TextInput>(null);
  const [amount, setAmount] = useState("");
  const [categories, setCategories] = useState<ItemProps[]>([
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
  ]);
  const toggleCategory = (index: number) => {
    setCategories((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item,
      ),
    );
  };

  return (
    <ScrollView style={styles.container}>
      <PrimaryInput
        label="Name"
        value={""}
        error=""
        placeholder="Give a name to the budget"
      />
      <PrimaryInput
        label="Amount"
        value={amount}
        error=""
        placeholder="0.00"
        onChangeText={setAmount}
        ref={ref}
      />
      <View style={{ flexDirection: "row", columnGap: scale(5) }}>
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
        values={["Weekly", "Monthly", "Yearly"]}
        onSelect={(selectedItem, index) => {}}
        style={styles.selectContainer}
      />
      <CustomText style={styles.label}>{nomenclature.CATEGORY}</CustomText>
      <CheckList items={categories} onToggle={toggleCategory} />
      <TouchableOpacity style={[buttonStyle,{marginTop:scale(35)}]}>
        <CustomText>{nomenclature.SAVE_BUDGET}</CustomText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SetCategoryBudget;

