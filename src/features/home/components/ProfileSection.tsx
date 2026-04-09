import React from 'react'
import { View,StyleSheet, Image } from 'react-native'
import CustomText from '@/src/components/CustomText'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import font from '@/src/constants/font'
import nomenclature from '@/src/constants/nomenclature'
import { AppTheme } from '@/src/constants/Colors'
import { scale } from '@/src/utils/scale'
import { useGetUserDetailsQuery } from '../slices/api/userApi'

const ProfileSection = () => {
    const {themePalette}=useTheme()
    const styles=useStyles(themePalette)
    const {data}=useGetUserDetailsQuery({})
  return (
    <View style={styles.profileContainer}>
        <View style={{}}>
            <CustomText variant='bold' size={font.size_24}>{'Hello, '+data?.fullName.split(' ')[0]}</CustomText>
            <CustomText size={font.size_14}>{nomenclature.BEGIN_TEXT}</CustomText>
        </View>
        <Image source={{uri:'https://content.latest-hairstyles.com/wp-content/uploads/long-wavy-pixie-cut-with-curls.jpg',width:70,height:70}} style={styles.profileImage}></Image>
    </View>
  )
}

const useStyles = (theme:AppTheme)=> StyleSheet.create({
    profileContainer:{
        marginLeft:scale(24),
        paddingTop:scale(15),
        flexDirection:'row',
        justifyContent:'space-between',
    },
    profileImage:{
        borderRadius:scale(40),
        marginRight:scale(24),
        borderWidth:scale(4),
        borderColor:theme.tint
    }
})
export default ProfileSection