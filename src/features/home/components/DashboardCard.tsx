import { Image, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import { useStyle } from '../styles/DashboardCardStyles'
import CustomText from '@/src/components/CustomText'
import nomenclature from '@/constants/nomenclature'
import font from '@/constants/font'
import { mascotImage } from '@/constants/constant'
import CustomIcon from '@/src/components/CustomIcon'


const DashboardCard = () => {
    const { themePalette } = useTheme()
    const styles = useStyle(themePalette)
    return (
        <View style={styles.cardContainer}>
            <View style={styles.infoRowContainer}>
            <View>
            <CustomText variant='regular' size={font.size_18} color={themePalette.secondaryText}>
                {nomenclature.current_balance}
            </CustomText>
            <CustomText variant='bold' size={font.size_24} color={themePalette.secondaryText} style={{paddingLeft: '2%',marginTop: 5}}>
                {nomenclature.rupee_sign+' '+10000}
            </CustomText>
            </View>
            <Image source={mascotImage} style={{width: 94, height: 90}}></Image>
            </View>
            <View style={[styles.infoRowContainer,{paddingHorizontal: '10%'}]}>
            <View style={{justifyContent:'center'}}>
                <CustomIcon type='AntDesign' name='arrowdown' size={16} color={themePalette.positive} iconStyle={{alignSelf:'center'}}/>
                <CustomText variant='regular' size={font.size_14} color={themePalette.secondaryText} style={{alignSelf:'center'}}>
                    {nomenclature.income}
                </CustomText>
                <CustomText variant='bold' color={themePalette.secondaryText} style={{alignSelf:'center'}}>
                    {nomenclature.rupee_sign+' '+5000}
                </CustomText>
            </View>
            <View style={{justifyContent:'center'}}>
                <CustomIcon type='AntDesign' name='arrowup' size={16} color={themePalette.negative} iconStyle={{alignSelf:'center'}}/>
                <CustomText variant='regular' size={font.size_14} color={themePalette.secondaryText} style={{alignSelf:'center'}}>
                    {nomenclature.expenses}
                </CustomText>
                <CustomText variant='bold' color={themePalette.secondaryText} style={{alignSelf:'center'}}>
                    {nomenclature.rupee_sign+' '+5000}
                </CustomText>
            </View>
            </View>
        </View>
    )
}

export default DashboardCard