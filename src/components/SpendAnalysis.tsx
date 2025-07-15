import { View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';
import { useTheme } from '../hooks/ThemeContextProvider';
import nomenclature from '@/constants/nomenclature';
import { spendAnalysisOptions } from '@/constants/constant';
const SpendAnalysis = () => {
  const { themePalette} = useTheme()
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
            style={{ fontFamily: 'poppins-bold',color: themePalette.text }}
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
        <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
          <CustomText size={16} variant='regular'>
            Spend Analysis Chart Placeholder
          </CustomText>
        </View>
      </BlurView>
    </View>
  )
}

export default SpendAnalysis