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
import { SafeAreaView } from 'react-native-safe-area-context'
import { pickColor } from '@/src/hooks/common'

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
        <SafeAreaView>
            <ScrollView style={{
            paddingHorizontal: '5%',
            paddingTop: '2%',
        }}>
                <View style={style.overviewCard}>
                    <CustomText size={font.size_14} color={themePalette.secondaryTextLight}>{nomenclature.TOTAL_SPENDING}</CustomText>
                    <CustomText variant='bold' size={font.size_24} color={themePalette.secondaryTextLight}>{'₹2,486.00'}</CustomText>
                    <View style={{ flexDirection: 'row' }}>
                        <CustomIcon name='arrowup' type='AntDesign' size={17} color={themePalette.secondaryTextLight} />
                        <CustomText size={font.size_14} color={themePalette.secondaryTextLight}>{'16% ' + nomenclature.FROM_LAST_MONTH}</CustomText>
                    </View>
                </View>
                <BlurView intensity={20} tint="light" style={{
                    marginHorizontal: '4%', marginTop: 10, borderRadius: 16, borderWidth: 0.2, borderColor: themePalette.borderColor,
                    overflow: 'hidden'
                }}>
                    <CustomText size={18} variant='bold' style={{ marginHorizontal: '6%', marginTop: 19 }}>
                        {nomenclature.EXPENSE_OVERVIEW}
                    </CustomText>
                    <View style={{ height: 330, justifyContent: 'center', alignItems: 'center' }}>
                        <BarChart
                            barWidth={32}
                            height={240}
                            noOfSections={3}
                            barBorderRadius={8}
                            frontColor="#1E85B7"
                            data={barData}
                            hideYAxisText={true}
                            hideAxesAndRules={true}
                            barBorderBottomLeftRadius={0}
                            barBorderBottomRightRadius={0}
                            xAxisLabelTextStyle={{ color: '#FFFF', fontFamily: 'poppins-regular', fontSize: 14 }}
                            yAxisThickness={0}
                            xAxisThickness={0}
                        />
                    </View>
                </BlurView>
                <BlurView intensity={20} tint="light" style={{
                    marginHorizontal: '4%', marginVertical: 20, borderRadius: 16, borderWidth: 0.2, borderColor: themePalette.borderColor,
                    overflow: 'hidden',alignItems:'center',justifyContent:'center',paddingVertical:20
                }}>
                    <PieChart
                        radius={100}
                        focusOnPress
                        textSize={10}
                        donut
                        innerRadius={80}
                        innerCircleColor={themePalette.backgroundGradient2}
                        centerLabelComponent={() => {
                return <CustomText color='black'>70%</CustomText>;
                }}
                        data={pieData}
                    />
                </BlurView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default YearlyStats