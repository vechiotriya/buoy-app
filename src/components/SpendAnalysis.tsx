import { View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';
import { useTheme } from '../hooks/ThemeContextProvider';
import nomenclature from '../constants/nomenclature';
import { spendAnalysisOptions } from '../constants/constant';
import { BarChart } from 'react-native-gifted-charts';
const SpendAnalysis = () => {
  const { themePalette} = useTheme()
      const barData = [
        {value: 250, label: 'Mon'},
        {value: 500, label: 'Tue'},
        {value: 745, label: 'Wed', frontColor: '#ffff'},
        {value: 320, label: 'Thu'},
        {value: 600, label: 'Fri'},
        {value: 256, label: 'Sat'},
        {value: 300, label: 'Sun'},
    ];
  return (
    <View style={{ rowGap: 15 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <CustomText size={18} variant='bold' style={{ marginHorizontal: '6%' }}>
          {nomenclature.spend_analysis}
        </CustomText>
        <BlurView intensity={90} tint="light" style={{
          marginRight: '6%', 
          borderRadius: 10,
          overflow: 'hidden',
          height: 40,
          width: 170,
          justifyContent: 'center',
        }}>
          <Picker
            selectedValue={'java'}
            mode="dropdown"
            style={{ fontFamily: 'poppins-bold',color: themePalette.text,backgroundColor:'#9AC3D7' }}
            dropdownIconColor={themePalette.text}
            onValueChange={
              (itemValue, itemIndex) => {
                console.log(itemValue, itemIndex);
              }
            }
            
            >
              {spendAnalysisOptions.map((option, index) => (
                <Picker.Item key={index} label={option} value={option.toLowerCase().replace(' ','_')} fontFamily='poppins-regular' color={themePalette.secondaryText}/>
              ))}
          </Picker>
        </BlurView>
      </View>
      <BlurView intensity={20} tint="light" style={{
        marginHorizontal: '6%', marginTop: 10, borderRadius: 16, borderWidth:0.2, borderColor: themePalette.borderColor,
        overflow: 'hidden'
      }}>
        <View style={{ height: 330, justifyContent: 'center', alignItems: 'center' }}>
          <BarChart
                barWidth={32}
                height={240}
                noOfSections={3}
                barBorderRadius={8}
                frontColor="#1E85B7"
                data={barData}
                hideYAxisText={true}
                hideAxesAndRules={true}
                barBorderBottomLeftRadius={0}
                barBorderBottomRightRadius={0}
                xAxisLabelTextStyle={{color:'#FFFF',fontFamily:'poppins-regular',fontSize:14}}
                yAxisThickness={0}
                xAxisThickness={0}
            />
        </View>
      </BlurView>
    </View>
  )
}

export default SpendAnalysis