import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomIcon } from '@/src/components/CustomIcon'
import CustomText from '@/src/components/CustomText'
import { scale } from '@/src/utils/scale'
import nomenclature from '@/src/constants/nomenclature'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import useStyles from './styles/SignInStyles'
import font from '@/src/constants/font'

const SocialFooter = () => {
      const {themePalette}= useTheme()
  const styles=useStyles(themePalette)
  return (
    <View style={styles.footerContainer}>
      <View style={{rowGap:scale(32),}}>
        <View style={{height:1,marginTop:scale(10),backgroundColor:themePalette.borderColor}}/>
        <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:themePalette.background,borderWidth:1,borderColor:themePalette.borderColor,borderRadius:12,width:scale(111),height:scale(46)}}>
          <CustomIcon name='google' type='FontAwesome' size={scale(20)} color={themePalette.tabIconDefault} iconStyle={{marginBottom:-3}}/>
        </TouchableOpacity>
      </View>
      <View style={{rowGap:scale(20),}}>
        <CustomText size={font.size_14}>{nomenclature.OR_CONTINUE_WITH}</CustomText>
        <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:themePalette.background,borderWidth:1,borderColor:themePalette.borderColor,borderRadius:12,width:scale(111),height:scale(46)}}>
          <CustomIcon name='apple' type='FontAwesome' size={scale(20)} color={themePalette.tabIconDefault} iconStyle={{marginBottom:-3}}/>
        </TouchableOpacity>
      </View>
      <View style={{rowGap:scale(32),}}>
        <View style={{height:1,marginTop:scale(10),backgroundColor:themePalette.borderColor}}/>
        <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:themePalette.background,borderWidth:1,borderColor:themePalette.borderColor,borderRadius:12,width:scale(111),height:scale(46)}}>
          <CustomIcon name='facebook' type='FontAwesome' size={scale(20)} color={themePalette.tabIconDefault} iconStyle={{marginBottom:-3}}/>
        </TouchableOpacity>
      </View>
      </View>
  )
}

export default SocialFooter