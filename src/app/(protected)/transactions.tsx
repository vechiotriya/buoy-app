import { CustomIcon } from "@/src/components/CustomIcon";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import nomenclature from "@/src/constants/nomenclature";
import FilterBar from "@/src/features/transactions/components/FilterBar";
import SearchBar from "@/src/features/transactions/components/SearchBar";
import {
  AMOUNT_MAPPING,
  CATEGORY_MAPPING,
  DATE_MAPPING,
  TYPE_MAPPING,
} from "@/src/features/transactions/constants";
import {
  FilterQueryParams,
  GroupedTransactionData,
} from "@/src/features/transactions/types";
import { useDebounceValue } from "@/src/hooks/common";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { useLazyGetGroupedTransactionBySearchQuery, useGetGroupedTransactionsByMonthQuery } from "@/src/services/transactionApi";
import { dayMonthExtractor } from "@/src/utils/misc";
import { scale } from "@/src/utils/scale";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { SectionList, View } from "react-native";

const Transactions = () => {
  const { themePalette } = useTheme();
  const [filteredData, setFilteredData] = useState<FilterQueryParams>({
    type: 'All',
    category: undefined,
    amount: undefined,
    date: undefined,
  });

  const body: FilterQueryParams = {
    type: filteredData.type
      ? (TYPE_MAPPING[filteredData.type] as typeof filteredData.type)
      : undefined,
    category: filteredData.category
      ? (CATEGORY_MAPPING as any)[filteredData.category]
      : (undefined as typeof filteredData.category),
    amount: filteredData.amount
      ? (AMOUNT_MAPPING as any)[filteredData.amount]
      : undefined,
    date: filteredData.date
      ? (DATE_MAPPING as any)[filteredData.date]
      : undefined,
  };
  const { data, isLoading, error,refetch } =
    useGetGroupedTransactionsByMonthQuery(body);
  console.log(error);
  const [triggerSearch, { data: searchResult }]= useLazyGetGroupedTransactionBySearchQuery();
  const [searchText, setSearchText] = useState('');
  const DATA =
    data?.map(
      ({ month, year, total, transactions }: GroupedTransactionData) => ({
        title: { month, year, total },
        data: transactions,
      }),
    ) ?? [];
  const searchResultData = searchResult?.map(({ month, year, total, transactions }: GroupedTransactionData) => ({
    title: { month, year, total },
    data: transactions,
  }))??[]
  const handleSearch = useDebounceValue((text:string)=>{
    setSearchText(text);
    if (text?.trim()){ 
      triggerSearch(text?.trim());
    }
    else refetch();
    },1000)

  const SearchFilterComponent=()=>{
    return (
          <>
            <SearchBar search={handleSearch}/>
            <FilterBar
              filteredData={filteredData}
              setFilteredData={setFilteredData}
            />
          </>
        );
  }
  return (
    <SectionList
      contentContainerStyle={{ paddingBottom: scale(84) }}
      ListHeaderComponent={<SearchFilterComponent/>}
      sections={searchText ? searchResultData : DATA}
      keyExtractor={(item) => item.purpose}
      renderItem={({ item, index, section }) => {
        return (
          <View
            style={{
              flexDirection: "row",
              padding: scale(16),
              borderBottomWidth:
                index === section.data.length - 1 ? 0 : scale(2),
              borderBottomColor: "rgba(255, 255, 255, 0.3)",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", columnGap: scale(16) }}>
              <View
                style={{
                  width: scale(44),
                  height: scale(44),
                  borderRadius: scale(8),
                  backgroundColor: themePalette.secondary,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CustomIcon
                  type="MaterialCommunityIcons"
                  name={item.iconName}
                  size={scale(20)}
                  color={themePalette.background}
                />
              </View>
              <View style={{ rowGap: scale(2) }}>
                <CustomText color={themePalette.text}>
                  {item.purpose}
                </CustomText>
                <CustomText size={font.size_14} color={themePalette.text}>
                  {dayMonthExtractor(item.transaction_date)}
                </CustomText>
              </View>
            </View>
            <View style={{ rowGap: scale(2) }}>
              <CustomText
                color={themePalette.text}
                size={font.size_14}
                style={{ textAlign: "right" }}
              >
                {item.category}
              </CustomText>
              <CustomText
                variant="bold"
                color={themePalette.text}
                style={{ textAlign: "right" }}
              >{`${item.transactionType === "Income" ? "+" : "-"}${nomenclature.RUPEE_SIGN}${item.amount}`}</CustomText>
            </View>
          </View>
        );
      }}
      renderSectionHeader={({ section: { title } }) => (
        <BlurView
          intensity={30}
          tint="light"
          style={{
            height: scale(76),
            padding: scale(16),
            overflow: "hidden",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View>
            <CustomText>{title.year}</CustomText>
            <CustomText>{title.month}</CustomText>
          </View>
          <CustomText variant="bold">{`${nomenclature.RUPEE_SIGN}${title.total}`}</CustomText>
        </BlurView>
      )}
    />
  );
};

export default Transactions;
