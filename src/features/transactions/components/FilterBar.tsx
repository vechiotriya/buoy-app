import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { scale } from "@/src/utils/scale";
import Select from "@/src/components/Select";

const FilterBar = () => {
  const { themePalette } = useTheme();
  const typeData = ["All", "Income", "Expense"];
  const categoryData = [
    "Housing",
    "Utilities & Bills",
    "Groceries",
    "Transportation",
    "Health & Insurance",
    "Entertainment",
    "Savings",
    "Debt",
    "Miscellaneous",
  ];
  const amountData = [
    "Up to ₹200",
    "₹200 - ₹500",
    "₹500 - ₹2000",
    "Above ₹2000",
  ];
  const dateData = [
    "Last 30 days",
    "Last 90 days",
    "This month",
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Select
        label="Type"
        onSelect={() => {
        }}
        values={typeData}
      ></Select>
      <Select
        label="Category"
        onSelect={() => {
        }}
        values={categoryData}
      ></Select>
      <Select
        label="Date"
        onSelect={() => {
        }}
        values={dateData}
      ></Select>
      <Select
        label="Amount"
        onSelect={() => {
        }}
        values={amountData}
      ></Select>
    </ScrollView>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container:{
        paddingHorizontal: scale(20),
        flexDirection: "row",
        alignItems: "center",
        gap: scale(12),
      },
});
