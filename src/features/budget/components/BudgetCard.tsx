import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppTheme } from "@/src/constants/Colors";
import { scale } from "@/src/utils/scale";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import { getCategoryColor } from "@/src/utils/misc";
import nomenclature from "@/src/constants/nomenclature";
import { ProgressBar } from "@/src/components/ProgressBar";
import { CustomIcon } from "@/src/components/CustomIcon";
import { useDeleteBudgetMutation } from "@/src/services/budgetApi";

export type Budget = {
  name: string;
  spent: number;
  amount: number;
  category: string[];
  period: string;
  id: string;
};
type Props = {
  budget: { item: Budget };
};
const BudgetCard: React.FC<Props> = ({ budget }) => {
  const budgetData = budget?.item;
  const { themePalette } = useTheme();
  const styles = useStyles(themePalette);
  const [deleteBudget,{isLoading,error}] = useDeleteBudgetMutation();
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CustomText variant="bold" color={themePalette.secondaryTextLight}>
          {budgetData?.name}
        </CustomText>
        <View style={{ alignItems: "flex-end", rowGap: scale(7) }}>
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
              {budgetData?.period}
            </CustomText>
          </View>
          <Pressable
            style={{
              paddingRight: scale(20),
              borderRadius: scale(20),
            }}
            onPress={() => {
              deleteBudget(budgetData?.id);
            }}
          >
            <CustomIcon
              type="AntDesign"
              name="delete"
              size={scale(16)}
              color={themePalette.inputText}
            />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          columnGap: scale(7),
          marginRight: scale(7),
        }}
      >
        {budgetData?.category?.map((cat) => (
          <View
            key={cat}
            style={{
              backgroundColor: getCategoryColor(
                themePalette.categoryColors,
                cat,
              ),
              alignItems: "center",
              justifyContent: "center",
              borderRadius: scale(18),
              height: scale(23),
              paddingHorizontal: scale(10),
            }}
          >
            <CustomText size={font.size_12}>{cat}</CustomText>
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
          {`${(budgetData.spent>budgetData.amount)?100: (Number(budgetData?.spent / budgetData?.amount) * 100).toFixed(0)}% ` +
            nomenclature.SPENT}
        </CustomText>
        <View style={{ flexDirection: "row" }}>
          <CustomText size={font.size_12} color={themePalette.inputText}>
            {nomenclature.RUPEE_SIGN + budgetData?.spent}
          </CustomText>
          <CustomText size={font.size_12} color={themePalette.inputText2}>
            {" / " + nomenclature.RUPEE_SIGN + budgetData?.amount}
          </CustomText>
        </View>
      </View>
      <ProgressBar progress={Number(budgetData?.spent / budgetData?.amount)} />
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
