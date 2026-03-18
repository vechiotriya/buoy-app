import { CustomIcon } from "@/src/components/CustomIcon"
import CustomText from "@/src/components/CustomText"
import font from "@/src/constants/font"
import nomenclature from "@/src/constants/nomenclature"
import FilterBar from "@/src/features/transactions/components/FilterBar"
import SearchBar from "@/src/features/transactions/components/SearchBar"
import { useTheme } from "@/src/hooks/ThemeContextProvider"
import { dayMonthExtractor } from "@/src/utils/misc"
import { scale } from "@/src/utils/scale"
import { BlurView } from "expo-blur"
import { SectionList, View } from "react-native"

const Transactions = () => {
  const {themePalette} = useTheme();
  const DATA=[
    {
      title: {month: 'January', year: '2024',total:45760},
      data: [{id: '1', name: 'Transaction 1',category: 'Food', iconName: 'food',date:'2023-01-01',amount:2722}, {id: '2', name: 'Transaction 2',category: 'Transportation', iconName: 'car',date:'2023-01-02',amount:1500 }, {id: '3', name: 'Transaction 3',category: 'Shopping', iconName: 'shopping',date:'2023-01-03',amount:3250}],
    },
    {
      title: {month: 'February', year: '2024',total:32500},
      data: [{id: '4', name: 'Transaction 4',category: 'Food', iconName: 'food',date:'2023-02-01',amount:2722}, {id: '5', name: 'Transaction 5',category: 'Transportation', iconName: 'car',date:'2023-02-02',amount:1500 }, {id: '6', name: 'Transaction 6',category: 'Shopping', iconName: 'shopping',date:'2023-02-03',amount:3250}],
    },
  ]
  return (
    <View style={{flex:1}}>
      <SearchBar />
      <FilterBar />
      <SectionList 
      sections={DATA}
      style={{marginTop: scale(35)}}
      renderItem={({item, index})=>{
        return (
          <View style={{flexDirection: 'row',padding: scale(16),borderBottomWidth: index === DATA.length?0:2, borderBottomColor: 'rgba(255, 255, 255, 0.3)',justifyContent:'space-between'}}>
           <View style={{flexDirection: 'row',columnGap: scale(16)}}>
           <View style={{width: scale(44), height: scale(44), borderRadius: scale(8), backgroundColor: themePalette.secondary, justifyContent: 'center', alignItems: 'center'}}>
            <CustomIcon type="MaterialCommunityIcons" name={item.iconName} size={scale(20)} color={themePalette.background}/>
            </View>
            <View style={{rowGap:scale(2)}}>
              <CustomText color={themePalette.text} >{item.name}</CustomText>
              <CustomText size={font.size_14} color={themePalette.text}>{dayMonthExtractor(item.date)}</CustomText>
            </View>
           </View>
            <View style={{rowGap:scale(2)}}>
              <CustomText color={themePalette.text} size={font.size_14} style={{textAlign:'right'}}>{item.category}</CustomText>
              <CustomText  variant="bold" color={themePalette.text} style={{textAlign:'right'}}>{`${nomenclature.RUPEE_SIGN}${item.amount}`}</CustomText>
            </View>
          </View>
        )
      } }
      renderSectionHeader={({section: {title}}) => (
                <BlurView intensity={30} tint="light" style={{
                    height: scale(76),
                    padding: scale(16),
                    overflow: 'hidden',
                    justifyContent: 'space-between',
                    flexDirection:'row',
                }}>
                  <View>
                   <CustomText >{title.year}</CustomText>
                   <CustomText >{title.month}</CustomText>
                   </View>
                   <CustomText variant='bold'>{`${nomenclature.RUPEE_SIGN}${title.total}`}</CustomText>
                </BlurView>
         
        )}
      />
    </View>
  )
}

export default Transactions