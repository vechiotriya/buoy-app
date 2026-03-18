import { ScrollView, View } from 'react-native'
import React from 'react'
import { useStyle } from './styles/StatisticsStyles'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import CustomText from '@/src/components/CustomText'
import nomenclature from '@/src/constants/nomenclature'
import font from '@/src/constants/font'
import { CustomIcon } from '@/src/components/CustomIcon'
import { BlurView } from 'expo-blur'
import { BarChart, PieChart } from 'react-native-gifted-charts'
import { pickColor } from '@/src/hooks/common'
import { scale } from '@/src/utils/scale'
import { RecentTransactions } from '@/src/components/RecentTransactions'

const YearlyStats = () => {
    const { themePalette } = useTheme()
    const style = useStyle(themePalette)
    const barData = [
        { value: 250, label: 'Jan' },
        { value: 500, label: 'Feb' },
        { value: 745, label: 'Mar', frontColor: '#ffff' },
        { value: 320, label: 'Apr' },
        { value: 600, label: 'May' },
        { value: 256, label: 'Jun' },
        { value: 30, label: 'Jul' },
        { value: 300, label: 'Aug' },
        { value: 390, label: 'Sep' },
        { value: 100, label: 'Oct' },
        { value: 300, label: 'Nov' },
        { value: 90, label: 'Dec' },
    ];
    const pieData = [
        { value: 54, color: pickColor(themePalette), text: '54%' },
        { value: 40, color: pickColor(themePalette), text: '30%' },
        { value: 20, color: pickColor(themePalette), text: '26%' },
    ];
    return (
            <ScrollView style={{
            paddingHorizontal: scale(2),
            paddingTop: scale(24),
        }}>
                <View style={style.overviewCard}>
                    <CustomText size={font.size_14} color={themePalette.secondaryTextLight}>{nomenclature.TOTAL_SPENDING}</CustomText>
                    <CustomText variant='bold' size={font.size_24} color={themePalette.secondaryTextLight}>{'₹2,486.00'}</CustomText>
                    <View style={{ flexDirection: 'row' }}>
                        <CustomIcon name='arrow-down-right' type='Feather' size={scale(19)} color={themePalette.negative} />
                        <CustomText size={font.size_14} color={themePalette.secondaryTextLight}>{'16% ' + nomenclature.LESS_THAN_LAST_MONTH}</CustomText>
                    </View>
                </View>
                <BlurView intensity={20} tint="light" style={{
                    marginHorizontal: scale(20), marginTop: scale(10), borderRadius: scale(16), borderWidth: 0.2, borderColor: themePalette.borderColor,
                    overflow: 'hidden'
                }}>
                    <CustomText size={font.size_18} variant='bold' style={{ marginHorizontal: scale(20), marginTop: scale(19) }}>
                        {nomenclature.EXPENSE_OVERVIEW}
                    </CustomText>
                    <View style={{ height: scale(330), justifyContent: 'center', alignItems: 'center' }}>
                        <BarChart
                            barWidth={scale(32)}
                            height={scale(240)}
                            noOfSections={3}
                            barBorderRadius={scale(8)}
                            frontColor="#1E85B7"
                            data={barData}
                            hideYAxisText={true}
                            hideAxesAndRules={true}
                            barBorderBottomLeftRadius={0}
                            barBorderBottomRightRadius={0}
                            xAxisLabelTextStyle={{ color: '#FFFF', fontFamily: 'poppins-regular', fontSize: font.size_14 }}
                            yAxisThickness={0}
                            xAxisThickness={0}
                        />
                    </View>
                </BlurView>
                <BlurView intensity={20} tint="light" style={{
                    margin:scale(20), borderRadius: scale(16), borderWidth: 0.2, borderColor: themePalette.borderColor,
                    overflow: 'hidden',alignItems:'center',justifyContent:'center',paddingVertical:scale(20)
                }}>
                    <PieChart
                        radius={scale(100)}
                        focusOnPress
                        textSize={font.size_12}
                        donut
                        innerRadius={scale(80)}
                        innerCircleColor={themePalette.backgroundGradient2}
                        centerLabelComponent={() => {
                return <CustomText color='black'>70%</CustomText>;
                }}
                        data={pieData}
                    />
                </BlurView>
                <RecentTransactions title={nomenclature.TRANSACTIONS}/>
            </ScrollView>
    )
}

export default YearlyStats