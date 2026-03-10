import CustomText from '@/src/components/CustomText'
import GradientBackground from '@/src/components/GradientBackground'
import TopTabNavigator from '@/src/components/TopTabNavigator'
import { loginNavigationTabs } from '@/src/constants/constant'
import font from '@/src/constants/font'
import nomenclature from '@/src/constants/nomenclature'
import { loginTitleText } from '@/src/constants/styles'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from '../utils/scale'

const sign = () => {
  const { themePalette}= useTheme()
  return (
    <View style={{ flex: 1}}> 
    <ScrollView contentContainerStyle={{flexGrow:1, justifyContent:'center'}}>
    <GradientBackground appTheme={themePalette} />
    <CustomText variant='bold' size={font.size_24} style={loginTitleText}>{nomenclature.LOGIN_TEXT}</CustomText>
    <TopTabNavigator menuHeaders={loginNavigationTabs}/>
    </ScrollView>
    </View>
  )
}

export default sign

