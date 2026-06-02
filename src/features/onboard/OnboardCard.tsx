import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomText from '@/src/components/CustomText'
import font from '@/src/constants/font'
import { ImageSourcePropType } from 'react-native'
import { scale } from '@/src/utils/scale'
import { useTheme } from '@/src/hooks/ThemeContextProvider'

interface OnboardCardProps{
    image: ImageSourcePropType,
    text: string
}
const OnboardCard = ({image,text}:OnboardCardProps) => {
  const { themePalette } = useTheme();
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Image source={image} style={{ width: scale(290), height: scale(290) }}></Image>
      <CustomText variant='bold' size={font.size_24} color={themePalette.text} style={{marginTop:20,alignSelf:'center',textAlign:'center',width:scale(300)}}>
        {text}
      </CustomText>
    </View>
  )
}

export default OnboardCard