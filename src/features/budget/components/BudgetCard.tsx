import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppTheme } from "@/src/constants/Colors";
import { scale } from "@/src/utils/scale";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import { getCategoryColor } from "@/src/utils/misc";
import nomenclature from "@/src/constants/nomenclature";
import { ProgressBar } from "@/src/components/ProgressBar";

type Budget = {
  name: string;
  spent: number;
  amount: number;
  categories: string[];
  duration: string;
};
const BudgetCard = ({ budget }: { budget: Budget }) => {
  const { themePalette } = useTheme();
  const styles = useStyles(themePalette);
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CustomText variant="bold" color={themePalette.secondaryTextLight}>
          {budget.name}
        </CustomText>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: themePalette.primary,
            borderRadius: scale(25),
            paddingVertical: scale(3),
            paddingHorizontal: scale(7),
          }}
        >
          <CustomText size={font.size_12} color={themePalette.primary}>
            {budget.duration}
          </CustomText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          columnGap: scale(10),
          marginRight: scale(7),
        }}
      >
        {budget.categories.map((category) => (
          <View
          key={category}
            style={{
              backgroundColor: getCategoryColor(
                themePalette.categoryColors,
                category,
              ),
              alignItems: "center",
              justifyContent: "center",
              borderRadius: scale(18),
              height: scale(23),
              paddingHorizontal: scale(10),
            }}
          >
            <CustomText size={font.size_12}>{category}</CustomText>
          </View>
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: scale(14),
        }}
      >
        <CustomText size={font.size_10} color={themePalette.inputText}>
          {"10% " + nomenclature.SPENT}
        </CustomText>
        <View style={{ flexDirection: "row" }}>
          <CustomText size={font.size_12} color={themePalette.inputText}>
            {nomenclature.RUPEE_SIGN + budget.spent}
          </CustomText>
          <CustomText size={font.size_12} color={themePalette.inputText2}>
            {" / " + nomenclature.RUPEE_SIGN + budget.amount}
          </CustomText>
        </View>
      </View>
      <ProgressBar progress={budget.spent / budget.amount} />
    </View>
  );
};

export default BudgetCard;

const useStyles = (themePalette: AppTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: themePalette.background,
      borderRadius: scale(16),
      paddingVertical: scale(14),
      paddingHorizontal: scale(16),
      width: scale(365),
      alignSelf: "center",
      marginBottom: scale(14),
    },
  });
