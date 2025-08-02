import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomIcon } from './CustomIcon'
import CustomText from './CustomText'
import font from '../constants/font'

const NavigationHeader = ({title,navigation}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity>
      <CustomIcon
      name='arrow-back-outline'
      type='Ionicons'
      size={14}
      />
      </TouchableOpacity>
      <TouchableOpacity>
      <CustomText
      size={font.size_24}
      variant='bold'
      >{title}</CustomText>
      </TouchableOpacity>
    </View>
  )
}

export default NavigationHeader

const styles = StyleSheet.create({})