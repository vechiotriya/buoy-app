import { Image, View } from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { useStyle } from "../styles/DashboardCardStyles";
import CustomText from "@/src/components/CustomText";
import { CustomIcon } from "@/src/components/CustomIcon";
import { mascot2Image } from "@/src/constants/constant";
import nomenclature from "@/src/constants/nomenclature";
import font from "@/src/constants/font";
import { createDateString } from "@/src/utils/misc";
import { useGetMonthTotalStatisticsQuery } from "@/src/services/transactionApi";
import { normalizeError } from "@/src/utils/error";
import { scale } from "@/src/utils/scale";
import { useNetInfo } from "@react-native-community/netinfo";
import { storage } from "@/src/services/storage";

const DashboardCard = () => {
  const { themePalette } = useTheme();
  const styles = useStyle(themePalette);
  const date = createDateString(new Date());

  const { data, isLoading, isError, error } =
    useGetMonthTotalStatisticsQuery(date);
  const [offlineData, setOfflineData] = React.useState(null);
  const netInfo = useNetInfo();
  if (error && netInfo.isConnected) {
    console.log("API error", error);
    throw normalizeError(error as Error);
  }
  useEffect(() => {
    if (!netInfo.isConnected) {
      const cachedData = storage.getString("cache");
      if (cachedData) {
        setOfflineData(JSON.parse(cachedData));
      }
    } else {
      storage.set("cache", data ? JSON.stringify(data) : "");
    }
  }, [netInfo.isConnected]);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.infoRowContainer}>
        <View>
          <CustomText
            variant="regular"
            size={font.size_18}
            color={themePalette.secondaryText}
          >
            {nomenclature.CURRENT_BALANCE}
          </CustomText>
          <CustomText
            variant="bold"
            size={font.size_32}
            color={themePalette.secondaryText}
            style={{ paddingLeft: "2%", marginTop: scale(5) }}
          >
            {nomenclature.RUPEE_SIGN +
              " " +
              (data?.balance ? data?.balance : offlineData?.balance??0)}
          </CustomText>
        </View>
        <Image
          source={mascot2Image}
          style={{ width: scale(100), height: scale(110) }}
        ></Image>
      </View>
      <View style={[styles.infoRowContainer, { paddingHorizontal: "10%" }]}>
        <View style={{ justifyContent: "center" }}>
          <CustomIcon
            type="AntDesign"
            name="arrow-down"
            size={16}
            color={themePalette.positive}
            iconStyle={{ alignSelf: "center" }}
          />
          <CustomText
            variant="regular"
            size={font.size_14}
            color={themePalette.secondaryText}
            style={{ alignSelf: "center" }}
          >
            {nomenclature.INCOME}
          </CustomText>
          <CustomText
            variant="bold"
            color={themePalette.secondaryText}
            style={{ alignSelf: "center" }}
          >
            {nomenclature.RUPEE_SIGN +
              " " +
              (data?.totalIncome
                ? data?.totalIncome
                : offlineData?.totalIncome??0)}
          </CustomText>
        </View>
        <View style={{ justifyContent: "center" }}>
          <CustomIcon
            type="AntDesign"
            name="arrow-up"
            size={16}
            color={themePalette.negative}
            iconStyle={{ alignSelf: "center" }}
          />
          <CustomText
            variant="regular"
            size={font.size_14}
            color={themePalette.secondaryText}
            style={{ alignSelf: "center" }}
          >
            {nomenclature.EXPENSES}
          </CustomText>
          <CustomText
            variant="bold"
            color={themePalette.secondaryText}
            style={{ alignSelf: "center" }}
          >
            {nomenclature.RUPEE_SIGN + " " + (data?.totalExpense ? data?.totalExpense : offlineData?.totalExpense??0)}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default DashboardCard;
