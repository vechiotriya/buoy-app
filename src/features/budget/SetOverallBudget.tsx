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

const SetOverallBudget = () => {
  const styles = useStyles();
  const ref = useRef<TextInput>(null);
  const [amount, setAmount] = useState("");
    const { themePalette } = useTheme();
    const buttonStyle = primaryButtonStyle(themePalette);
  return (
    <ScrollView style={styles.container}>
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
      <TouchableOpacity style={[buttonStyle, { marginTop: scale(35) }]}>
        <CustomText>{nomenclature.UPDATE_BUDGET}</CustomText>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SetOverallBudget;
