import { ScrollView, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { useStyles } from "./styles/SetBudget";
import PrimaryInput from "@/src/components/PrimaryInput";
import QuickInput from "./components/QuickInput";
import { View } from "react-native";
import { quickInputs } from "@/src/constants/constant";
import CustomText from "@/src/components/CustomText";
import Select from "@/src/components/Select";
import nomenclature from "@/src/constants/nomenclature";
import { TextInput } from "react-native";
import { scale } from "@/src/utils/scale";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { primaryButtonStyle } from "@/src/constants/styles";
import { useAddBudgetMutation } from "@/src/services/budgetApi";
import font from "@/src/constants/font";
import { useRouter } from "expo-router";
import { useToast } from "@/src/hooks/ToastContextProvider";

const SetOverallBudget = () => {
  const styles = useStyles();
  const ref = useRef<TextInput>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");
  const [amount, setAmount] = useState("");
  const { themePalette } = useTheme();
  const [addBudget, { isLoading }] = useAddBudgetMutation();
  const disabled = isLoading || !amount||!selectedPeriod;
  const buttonStyle = primaryButtonStyle(themePalette, disabled);
  const router = useRouter();
  const { show } = useToast();

  const handleAddBudget = () => {
    console.log("adding budget", {
      amount,
      period: selectedPeriod,
      name: selectedPeriod + " Budget",
      spent: 0,
    });

    addBudget({
      amount,
      period: selectedPeriod,
      name: selectedPeriod + " Budget",
      spent: 0,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        show({ message:nomenclature.ADD_BUDGET_SUCCESSFUL_MESSAGE,title:nomenclature.ADD_BUDGET_SUCCESSFUL_TITLE, type: "success" });
        router.push("/budget");
      })
      .catch((err) => {
        console.log(JSON.parse(err.data).message);
        show({ message:JSON.parse(err.data).message,title:nomenclature.ADD_BUDGET_FAILED_TITLE, type: "error" });
      });
  };
  return (
    <ScrollView style={styles.container}>
      <PrimaryInput
        label="Amount"
        value={amount}
        error=""
        keyboardType="numeric"
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
        onSelect={(selectedItem, index) => {
          setSelectedPeriod(selectedItem as string);
        }}
        style={styles.selectContainer}
      />
      <CustomText size={font.size_12} style={{ marginTop: scale(10) }}>
        {nomenclature.STANDARD_BUDGET_WARNING}
      </CustomText>
      <TouchableOpacity
        onPress={() => {
          handleAddBudget();
        }}
        disabled={disabled}
        style={[buttonStyle, { marginTop: scale(35) }]}
      >
        <CustomText>{nomenclature.UPDATE_BUDGET}</CustomText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SetOverallBudget;
