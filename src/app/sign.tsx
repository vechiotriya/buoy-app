import CustomText from '@/src/components/CustomText'
import GradientBackground from '@/src/components/GradientBackground'
import TopTabNavigator from '@/src/components/TopTabNavigator'
import { loginNavigationTabs } from '@/src/constants/constant'
import font from '@/src/constants/font'
import nomenclature from '@/src/constants/nomenclature'
import { loginTitleText } from '@/src/constants/styles'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import { SafeAreaView } from 'react-native-safe-area-context'

const sign = () => {
  const { themePalette}= useTheme()
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"pink"}} >
    <GradientBackground appTheme={themePalette} />
    <CustomText variant='bold' size={font.size_24} style={loginTitleText}>{nomenclature.LOGIN_TEXT}</CustomText>
    <TopTabNavigator menuHeaders={loginNavigationTabs}/>
    </SafeAreaView>
  )
}

export default sign

