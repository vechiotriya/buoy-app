import React from 'react'
import { View,StyleSheet, Image } from 'react-native'
import CustomText from '@/src/components/CustomText'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import font from '@/src/constants/font'
import nomenclature from '@/src/constants/nomenclature'
import { AppTheme } from '@/src/constants/Colors'

const ProfileSection = () => {
    const {themePalette}=useTheme()
    const styles=useStyles(themePalette)
  return (
    <View style={styles.profileContainer}>
        <View style={{}}>
            <CustomText variant='bold' size={font.size_24}>Hello, Ritul</CustomText>
            <CustomText size={font.size_14}>{nomenclature.begin_text}</CustomText>
        </View>
        <Image source={{uri:'https://content.latest-hairstyles.com/wp-content/uploads/long-wavy-pixie-cut-with-curls.jpg',width:70,height:70}} style={styles.profileImage}></Image>
    </View>
  )
}

const useStyles = (theme:AppTheme)=> StyleSheet.create({
    profileContainer:{
        marginLeft:24,
        paddingTop:15,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    profileImage:{
        borderRadius:40,
        marginRight:24,
        borderWidth:4,
        borderColor:theme.tint
    }
})
export default ProfileSection