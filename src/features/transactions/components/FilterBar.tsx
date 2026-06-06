import { ScrollView, StyleSheet } from "react-native";
import React, { useRef } from "react";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { scale } from "@/src/utils/scale";
import Select from "@/src/components/Select";
import { FilterQueryParams } from "../types";
import {
  AMOUNT_MAPPING,
  CATEGORY_MAPPING,
  DATE_MAPPING,
  TYPE_MAPPING,
} from "../constants";

const FilterBar = ({
  filteredData,
  setFilteredData,
}: {
  filteredData: FilterQueryParams;
  setFilteredData: React.Dispatch<React.SetStateAction<FilterQueryParams>>;
}) => {
  const { themePalette } = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Select
        label="Type"
        currentSelectedItem={filteredData.type}
        onSelect={(item) => {
          const selectedType = item as FilterQueryParams["type"];
          if (filteredData.type === selectedType) {
            setFilteredData((prev) => ({ ...prev, type: undefined }));
          } else {
            setFilteredData((prev) => ({
              ...prev,
              type: selectedType,
            }));
          }
        }}
        values={Object.keys(TYPE_MAPPING)}
      ></Select>
      <Select
        label="Category"
        currentSelectedItem={filteredData.category}
        onSelect={(item) => {
          const selectedCategory = item as FilterQueryParams["category"];
          setFilteredData((prev) => {
            if (prev.category === selectedCategory) {
              return { ...prev, category: undefined };
            }
            return { ...prev, category: selectedCategory };
          });
        }}
        values={Object.keys(CATEGORY_MAPPING)}
      ></Select>
      <Select
        label="Date"
        currentSelectedItem={filteredData.date}
        onSelect={(item) => {
          const selectedDate = item as FilterQueryParams["date"];
          if (filteredData.date === selectedDate) {
            setFilteredData((prev) => ({ ...prev, date: undefined }));
          } else {
            setFilteredData((prev) => ({
              ...prev,
              date: selectedDate,
            }));
          }
        }}
        values={Object.keys(DATE_MAPPING)}
      ></Select>
      <Select
        label="Amount"
        currentSelectedItem={filteredData.amount}
        onSelect={(item) => {
          const selectedAmount = item as FilterQueryParams["amount"];
          if (filteredData.amount === selectedAmount) {
            setFilteredData((prev) => ({ ...prev, amount: undefined }));
          } else {
            setFilteredData((prev) => ({
              ...prev,
              amount: selectedAmount,
            }));
          }
        }}
        values={Object.keys(AMOUNT_MAPPING)}
      ></Select>
    </ScrollView>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(15),
    flexDirection: "row",
    alignItems: "flex-start",
    gap: scale(12),
    marginTop: scale(20),
  },
});
