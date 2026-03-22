import { CustomIcon } from "@/src/components/CustomIcon";
import CustomText from "@/src/components/CustomText";
import GradientBackground from "@/src/components/GradientBackground";
import { AppTheme } from "@/src/constants/Colors";
import font from "@/src/constants/font";
import nomenclature from "@/src/constants/nomenclature";
import BudgetCard from "@/src/features/budget/components/BudgetCard";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { scale } from "@/src/utils/scale";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PieChartPro } from "react-native-gifted-charts";

export default function Budget() {
  const { themePalette } = useTheme();
  const styles = useStyles(themePalette);
  const pieData = [
    { value: 75, color: "lightgray" },
    { value: 25, color: themePalette.speedometerColor },
  ];
  return (
    <View style={styles.container}>
      <GradientBackground appTheme={themePalette} />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: scale(40),
        }}
      >
        <PieChartPro
          data={pieData}
          semiCircle
          donut
          innerCircleColor={"transparent"}
          radius={scale(140)}
          innerRadius={scale(120)}
          centerLabelComponent={() => (
            <View style={{ alignItems: "center" }}>
              <CustomText
                style={{ fontSize: 40, fontWeight: "bold", color: "white" }}
              >
                27%
              </CustomText>
              <CustomText style={{ fontSize: 20, color: "white" }}>
                spent
              </CustomText>
            </View>
          )}
        />
      </View>
      <View style={[styles.card,{marginTop:scale(45)}]}>
        <CustomText variant="bold" size={font.size_18} color={themePalette.primary}>
          {nomenclature.MONTHLY_BUDGET_OVERVIEW}
        </CustomText>
        <View style={{ flexDirection: "row", justifyContent: "space-around",marginTop:scale(20),columnGap:scale(25),borderBottomWidth:1,borderBottomColor:themePalette.borderSecondary,paddingBottom:scale(10) }}>
          <View style={{rowGap:scale(2)}}>
            <CustomText size={font.size_14} color={themePalette.inputText}>{nomenclature.TOTAL_BUDGET}</CustomText>
            <CustomText size={font.size_14} variant="bold" color={themePalette.secondaryTextLight}>{nomenclature.RUPEE_SIGN + " 10000"}</CustomText>
          </View>
          <View style={{rowGap:scale(2)}}>
            <CustomText size={font.size_14} color={themePalette.inputText}>{nomenclature.REMAINING}</CustomText>
            <CustomText size={font.size_14} variant="bold" color={themePalette.secondaryTextLight}>{nomenclature.RUPEE_SIGN + " 10000"}</CustomText>
          </View>
      </View>
      <View style={{flexDirection:'row',columnGap:scale(7),marginTop:scale(13),marginLeft:scale(2)}}>
          <View style={{width:scale(31),height:scale(31),borderRadius:scale(16),backgroundColor:"#CCFFCB",justifyContent:'center',alignItems:'center'}}>
            <CustomIcon name='check' type='FontAwesome' size={scale(15)} color={themePalette.positive} iconStyle={{marginBottom:-3}}/>
          </View>
          <View>
            <CustomText size={font.size_14} color={themePalette.secondaryTextLight}>{'You\’re on track'}</CustomText>
            <CustomText size={font.size_12} color={themePalette.inputText2}>{"Spending under control. Future you approves.😎"}</CustomText>
          </View>
      </View>
      </View>
      <CustomText style={{marginVertical:scale(23),marginLeft:scale(27)}} variant="bold">{nomenclature.ONGOING_BUDGET}</CustomText>
      <FlatList style={{flex:1}} data={[{name:'Dining',categories:['Foods & Drinks'],duration:'Monthly',spent:400,amount:1000},{name:'Gifts',categories:['Foods & Drinks','Shopping'],duration:'Weekly',spent:1400,amount:1000}]} renderItem={(budget) => {return <BudgetCard key={budget.item.name} budget={budget.item} />}} keyExtractor={(item, index) => index.toString()} />
    </View>
  );
}

const useStyles=(themePalette:AppTheme)=> StyleSheet.create({
  container: {
    flex: 1,
  },
  card:{
    backgroundColor:themePalette.background,
    borderRadius:scale(16),
    paddingVertical:scale(14),
    paddingHorizontal:scale(16),
    width:scale(365),
    alignSelf:'center'
  }
});
