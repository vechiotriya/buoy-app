import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { AppTheme } from '@/src/constants/Colors'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import { CustomIcon } from '@/src/components/CustomIcon'
import CustomText from '@/src/components/CustomText'
import font from '@/src/constants/font'
import { scale } from '@/src/utils/scale'

interface KeypadButtonProps{
    label:string,
    icon?:'backspace'|'calendar-month'|'trash-can'|'check',
    backgroundColor:string,
    onPress:Function,
    style?:ViewStyle
}
const KeypadButton = ({label,icon,backgroundColor,onPress,style}:KeypadButtonProps) => {
  const {themePalette}=useTheme()
  const styles=useStyles(themePalette)
  return (
    <TouchableOpacity style={[styles.buttonContainer,{backgroundColor},style]} onPress={()=>{onPress()}}>
      {icon?<CustomIcon name={icon} type='MaterialCommunityIcons' size={scale(35)} color={themePalette.text} iconStyle={styles.buttonText}/>
      :<CustomText size={font.size_32} color={themePalette.secondaryText} style={styles.buttonText}>{label}</CustomText>  
    }
    </TouchableOpacity>
  )
}

export default KeypadButton

const useStyles = (theme:AppTheme)=>StyleSheet.create({
  buttonContainer:{
    width:scale(82),
    height:scale(82),
    borderRadius:scale(30),
    alignContent:'center',
    justifyContent:'center',
    marginBottom:scale(4)
  },
  buttonText:{
    textAlign:'center'
  }
})