import { View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { BlurView } from "expo-blur";
import { useTheme } from "../hooks/ThemeContextProvider";
import nomenclature from "../constants/nomenclature";
import { spendAnalysisOptions } from "../constants/constant";
import { BarChart } from "react-native-gifted-charts";
import { scale } from "../utils/scale";
import Select from "./Select";
const SpendAnalysis = () => {
  const { themePalette } = useTheme();
  const barData = [
    { value: 250, label: "Mon" },
    { value: 500, label: "Tue" },
    { value: 745, label: "Wed", frontColor: "#ffff" },
    { value: 320, label: "Thu" },
    { value: 600, label: "Fri" },
    { value: 256, label: "Sat" },
    { value: 300, label: "Sun" },
  ];
  return (
    <View style={{ rowGap: scale(15) }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomText
          size={18}
          variant="bold"
          style={{ marginHorizontal: scale(24) }}
        >
          {nomenclature.SPEND_ANALYSIS}
        </CustomText>
        <BlurView
          intensity={90}
          tint="light"
          style={{
            marginRight: scale(24),
            borderRadius: scale(10),
            overflow: "hidden",
            height: scale(40),
            width: scale(170),
            justifyContent: "center",
          }}
        >
          <Select            
            onSelect={() => {}}
            values={spendAnalysisOptions}
          ></Select>
        </BlurView>
      </View>
      <BlurView
        intensity={20}
        tint="light"
        style={{
          marginHorizontal: "6%",
          marginTop: 10,
          borderRadius: 16,
          borderWidth: 0.2,
          borderColor: themePalette.borderColor,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: scale(290),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BarChart
            barWidth={scale(32)}
            height={scale(220)}
            noOfSections={3}
            barBorderRadius={scale(8)}
            frontColor="#1E85B7"
            data={barData}
            hideYAxisText={true}
            hideAxesAndRules={true}
            barBorderBottomLeftRadius={0}
            barBorderBottomRightRadius={0}
            xAxisLabelTextStyle={{
              color: "#FFFF",
              fontFamily: "poppins-regular",
              fontSize: 14,
            }}
            yAxisThickness={0}
            xAxisThickness={0}
          />
        </View>
      </BlurView>
    </View>
  );
};

export default SpendAnalysis;
