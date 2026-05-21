import { ScrollView, View } from "react-native";
import React from "react";
import { useStyle } from "./styles/StatisticsStyles";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import CustomText from "@/src/components/CustomText";
import nomenclature from "@/src/constants/nomenclature";
import font from "@/src/constants/font";
import { CustomIcon } from "@/src/components/CustomIcon";
import { BlurView } from "expo-blur";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { pickColor } from "@/src/hooks/common";
import { scale } from "@/src/utils/scale";
import { RecentTransactions } from "@/src/components/RecentTransactions";
import { useGetStatsByYearQuery } from "@/src/services/transactionApi";
import { useGetCategoriesExpensesQuery } from "@/src/services/categoryApi";
import { getCategoryColor } from "@/src/utils/misc";

const YearlyStats = () => {
  const { themePalette } = useTheme();
  const style = useStyle(themePalette);
  const { data, isLoading, error } = useGetStatsByYearQuery();
  const { data: categoryExpenses } = useGetCategoriesExpensesQuery({});
  const pieData =
    categoryExpenses?.year?.map((item: any) => ({
      value: item.value,
      color: getCategoryColor(themePalette.donutChartColors, item.text),
      text: item.text,
    })) || [];
  console.log("pp", pieData);

  return (
    <ScrollView
      style={{
        paddingHorizontal: scale(2),
        paddingTop: scale(24),
      }}
    >
      <View style={style.overviewCard}>
        <CustomText size={font.size_14} color={themePalette.secondaryTextLight}>
          {nomenclature.TOTAL_SPENDING}
        </CustomText>
        <CustomText
          variant="bold"
          size={font.size_24}
          color={themePalette.secondaryTextLight}
        >
          {nomenclature.RUPEE_SIGN + " " + data?.total}
        </CustomText>
        <View style={{ flexDirection: "row" }}>
          {!!data?.changeSinceLast &&
            (data?.changeSinceLast > 0 ? (
              <CustomIcon
                name="arrow-up-right"
                type="Feather"
                size={scale(15)}
                color={themePalette.positive}
              />
            ) : (
              <CustomIcon
                name="arrow-down-right"
                type="Feather"
                size={scale(15)}
                color={themePalette.negative}
              />
            ))}
          {!!data?.changeSinceLast && (
            <CustomText
              size={font.size_12}
              color={themePalette.secondaryTextLight}
            >
              {data?.changeSinceLast +
                "% " +
                (Number(data?.changeSinceLast) < 0
                  ? nomenclature.LESS_THAN_LAST_MONTH
                  : nomenclature.MORE_THAN_LAST_MONTH)}
            </CustomText>
          )}
        </View>
        <BlurView
          intensity={50}
          style={{
            marginTop: scale(10),
            borderRadius: scale(16),
            borderWidth: 0.2,
            paddingLeft: scale(15),
            backgroundColor: "rgba(196, 232, 251, 0.5)",
            borderColor: themePalette.borderColor,
            overflow: "hidden",
            paddingVertical: scale(10),
          }}
        >
          <CustomText size={font.size_12} color={themePalette.inputText2}>
            {nomenclature.TOP_SPENDING_MONTH}
          </CustomText>
          <CustomText
            size={font.size_18}
            variant="bold"
            color={themePalette.primary}
          >
            {data?.topSpending || "Monday"}
          </CustomText>
          <CustomText
            size={font.size_14}
            color={themePalette.secondaryTextLight}
          >
            {nomenclature.RUPEE_SIGN + " " + data?.topSpendingAmount || "0"}
          </CustomText>
        </BlurView>
      </View>
      <BlurView
        intensity={20}
        tint="light"
        style={{
          marginHorizontal: scale(20),
          marginTop: scale(10),
          borderRadius: scale(16),
          borderWidth: 0.2,
          borderColor: themePalette.borderColor,
          overflow: "hidden",
        }}
      >
        <CustomText
          size={font.size_18}
          variant="bold"
          style={{ marginHorizontal: scale(20), marginTop: scale(19) }}
        >
          {nomenclature.EXPENSE_OVERVIEW}
        </CustomText>
        <View
          style={{
            height: scale(330),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BarChart
            barWidth={scale(32)}
            height={scale(240)}
            noOfSections={3}
            barBorderRadius={scale(8)}
            frontColor="#1E85B7"
            data={data?.graph}
            hideYAxisText={true}
            hideAxesAndRules={true}
            barBorderBottomLeftRadius={0}
            barBorderBottomRightRadius={0}
            xAxisLabelTextStyle={{
              color: "#FFFF",
              fontFamily: "poppins-regular",
              fontSize: font.size_14,
            }}
            yAxisThickness={0}
            xAxisThickness={0}
          />
        </View>
      </BlurView>
      <BlurView
        intensity={20}
        tint="light"
        style={{
          margin: scale(20),
          borderRadius: scale(16),
          borderWidth: 0.2,
          borderColor: themePalette.borderColor,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: scale(20),
        }}
      >
        <CustomText
          size={font.size_18}
          variant="bold"
          style={{ marginVertical: scale(5), marginLeft: scale(20) }}
        >
          {nomenclature.CATEGORY_WISE_SPENDING}
        </CustomText>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <PieChart
          radius={scale(100)}
          focusOnPress
          focusedPieIndex={0}
          textSize={font.size_12}
          showValuesAsTooltipText={true}
          donut
          innerRadius={scale(80)}
          innerCircleBorderWidth={scale(2)}
          innerCircleColor={themePalette.backgroundGradient2}
          centerLabelComponent={(value: number) => {
            console.log(value);
            if (value == -1) return;
            return (
              <View style={{ alignItems: "center" }}>
                <CustomText variant="bold">{pieData[value]?.text}</CustomText>
                <CustomText>{`${pieData[value]?.value} %`}</CustomText>
              </View>
            );
          }}
          data={pieData}
        />
        </View>
      </BlurView>
      <RecentTransactions title={nomenclature.TRANSACTIONS} />
    </ScrollView>
  );
};

export default YearlyStats;
