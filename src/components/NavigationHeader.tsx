import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomIcon } from './CustomIcon'
import CustomText from './CustomText'
import font from '../constants/font'
import { NavigationProp } from '@react-navigation/native'

type NavigationHeaderProps = {
  navigation: NavigationProp<any>;
  title: string;
};

const NavigationHeader = ({title, navigation}: NavigationHeaderProps) => {
  return (
    <View style={{marginTop: '12%', flexDirection: 'row', alignItems: 'center', marginHorizontal: '6%',columnGap: '25%'}}>
      <TouchableOpacity onPress={()=>{navigation.goBack()}}>
      <View style={{backgroundColor: '#FFFDFD', padding: 8, borderRadius: 30,width:45,height:45,justifyContent:'center',alignItems:'center'}}>
     <CustomIcon
      name='chevron-back'
      type='Ionicons'
      size={24}
      color='#7F7F7F'
      />
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <CustomText
      size={font.size_24}
      variant='bold'
      >{title.charAt(0).toUpperCase() + title.slice(1)}</CustomText>
      </TouchableOpacity>
    </View>
  )
}

export default NavigationHeader

const styles = StyleSheet.create({})