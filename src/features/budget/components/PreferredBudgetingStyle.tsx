import { Pressable, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import CustomText from '@/src/components/CustomText'
import font from '@/src/constants/font'
import BudgetOption from './BudgetOption'
import { budgetingStyles } from '@/src/constants/constant'
import { scale } from '@/src/utils/scale'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import { primaryButtonStyle } from '@/src/constants/styles'

type PreferredBudgetingStyleProps={
  updateProfile:any;
  fullName:string|undefined;
}
const PreferredBudgetingStyle:React.FC<PreferredBudgetingStyleProps> = ({updateProfile,fullName}) => {
    const [selectedStyle,setSelectedStyle]=useState<string>('');
    const {themePalette}=useTheme();
    const disabled=!selectedStyle;
    const buttonStyle = primaryButtonStyle(themePalette,disabled);
  return (
    <View style={styles.container}>
      <CustomText size={font.size_32} style={{textAlign:'center',marginBottom:scale(40)}}>What is your preferred budgeting style?</CustomText>
      {budgetingStyles.map((style,index)=>(
        <BudgetOption
          key={style.title}
          title={style.title}
          description={style.description}
          selected={selectedStyle===style.title}
          pressed={() => setSelectedStyle(style.title)}
        />
      ))}
      <Pressable onPress={() => updateProfile({ prefBudgetStyle: selectedStyle.split(" ")[0]==="Envelope"?"Category":"Standard", fullName: fullName })} style={[buttonStyle,{alignSelf:'center'}]} disabled={disabled}><CustomText>Continue</CustomText></Pressable>
    </View>
  )
}

export default PreferredBudgetingStyle

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:scale(10),
        paddingTop:scale(40),
        flex:1,
    }
})