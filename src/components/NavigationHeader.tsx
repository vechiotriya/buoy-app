import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomIcon } from './CustomIcon'
import CustomText from './CustomText'
import font from '../constants/font'
import { NavigationProp } from '@react-navigation/native'
import { scale } from '../utils/scale'

type NavigationHeaderProps = {
  navigation: NavigationProp<any>;
  title: string;
};

const NavigationHeader = ({title, navigation}: NavigationHeaderProps) => {
  return (
    <View style={{marginTop: scale(50), flexDirection: 'row', marginHorizontal: scale(24),columnGap: scale(70)}}>
      <TouchableOpacity onPress={()=>{navigation.goBack()}}>
      <View style={{backgroundColor: '#FFFDFD', padding: scale(8), borderRadius: scale(30),width:scale(40),height:scale(40)}}>
     <CustomIcon
      name='chevron-back'
      type='Ionicons'
      size={scale(20)}
      color='#7F7F7F'
      />
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <CustomText
      size={font.size_24}
      variant='bold'
      >{title.charAt(0).toUpperCase() + title.slice(1).replace('-', ' ')}</CustomText>
      </TouchableOpacity>
    </View>
  )
}

export default NavigationHeader