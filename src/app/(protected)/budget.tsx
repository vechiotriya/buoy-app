import { CustomIcon } from "@/src/components/CustomIcon";
import CustomText from "@/src/components/CustomText";
import Empty from "@/src/components/Empty";
import GradientBackground from "@/src/components/GradientBackground";
import { AppTheme } from "@/src/constants/Colors";
import font from "@/src/constants/font";
import nomenclature from "@/src/constants/nomenclature";
import BudgetCard, { Budget as BudgetType } from "@/src/features/budget/components/BudgetCard";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { useGetBudgetQuery } from "@/src/services/budgetApi";
import { normalizeError } from "@/src/utils/error";
import { scale } from "@/src/utils/scale";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PieChartPro } from "react-native-gifted-charts";

export default function Budget() {
  const { themePalette } = useTheme();
  const styles = useStyles(themePalette);
  const { data: budgetData, isLoading, error } = useGetBudgetQuery({});

  if (error) {
    console.log("API error", error);
    throw normalizeError(error as Error);
  }
  
  const overallBudget = budgetData?.find((item:BudgetType)=>item.name==='All')??null;
  const categoryBudgets = budgetData?.filter((item:BudgetType)=>item.name!=='All')??[];
  const totalSpentPercentage: number = overallBudget ? (overallBudget.spent / overallBudget.amount) * 100 : 0;
  
  const pieData = [
    { value: 100-totalSpentPercentage,color: "lightgray"},
    { value: totalSpentPercentage,color: themePalette.speedometerColor },
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
              {`${totalSpentPercentage.toFixed(0)} %`}
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
            <CustomText size={font.size_14} variant="bold" color={themePalette.secondaryTextLight}>{nomenclature.RUPEE_SIGN + " " + (overallBudget?.amount.toFixed(2) || "0.00")}</CustomText>
          </View>
          <View style={{rowGap:scale(2)}}>
            <CustomText size={font.size_14} color={themePalette.inputText}>{nomenclature.REMAINING}</CustomText>
            <CustomText size={font.size_14} variant="bold" color={themePalette.secondaryTextLight}>{nomenclature.RUPEE_SIGN + " " + (overallBudget ? (overallBudget.amount - overallBudget.spent).toFixed(2) : "0.00")}</CustomText>
          </View>
      </View>
{ totalSpentPercentage <= 75 && 
    <View style={{flexDirection:'row',columnGap:scale(7),marginTop:scale(13),marginLeft:scale(2)}}>
          <View style={{width:scale(31),height:scale(31),borderRadius:scale(16),backgroundColor:"#CCFFCB",justifyContent:'center',alignItems:'center'}}>
            <CustomIcon name='check' type='FontAwesome' size={scale(15)} color={themePalette.positive} iconStyle={{marginBottom:-3}}/>
          </View>
          <View>
            <CustomText size={font.size_14} color={themePalette.secondaryTextLight}>{'You\’re on track'}</CustomText>
            <CustomText size={font.size_12} color={themePalette.inputText2}>{"Spending under control. Future you approves.😎"}</CustomText>
          </View>
      </View>
      }
{ totalSpentPercentage > 75 && 
    <View style={{flexDirection:'row',columnGap:scale(7),marginTop:scale(13),marginLeft:scale(2)}}>
          <View style={{width:scale(31),height:scale(31),borderRadius:scale(16),backgroundColor:"#CCFFCB",justifyContent:'center',alignItems:'center'}}>
            <CustomIcon name='check' type='FontAwesome' size={scale(15)} color={themePalette.positive} iconStyle={{marginBottom:-3}}/>
          </View>
          <View>
            <CustomText size={font.size_14} color={themePalette.secondaryTextLight}>{'Whoops watch out!'}</CustomText>
            <CustomText size={font.size_12} color={themePalette.inputText2}>{"Spending about to hit the ceiling..👀"}</CustomText>
          </View>
      </View>
      }
{ totalSpentPercentage >= 100 && 
    <View style={{flexDirection:'row',columnGap:scale(7),marginTop:scale(13),marginLeft:scale(2)}}>
          <View style={{width:scale(31),height:scale(31),borderRadius:scale(16),backgroundColor:"#CCFFCB",justifyContent:'center',alignItems:'center'}}>
            <CustomIcon name='check' type='FontAwesome' size={scale(15)} color={themePalette.positive} iconStyle={{marginBottom:-3}}/>
          </View>
          <View>
            <CustomText size={font.size_14} color={themePalette.secondaryTextLight}>{'Womp womp'}</CustomText>
            <CustomText size={font.size_12} color={themePalette.inputText2}>{"You have spent all your budget.💀"}</CustomText>
          </View>
      </View>
      }
      </View>
      <CustomText style={{marginVertical:scale(23),marginLeft:scale(27)}} variant="bold">{nomenclature.ONGOING_BUDGET}</CustomText>
      <FlatList style={{flex:1}} contentContainerStyle={{paddingBottom:scale(54)}} data={categoryBudgets} renderItem={(budget) => {return <BudgetCard key={budget?.item?.name} budget={budget} />}} keyExtractor={(item, index) => item.name} ListEmptyComponent={()=>{
        return <Empty text="No ongoing budgets." />
      }}/>

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
