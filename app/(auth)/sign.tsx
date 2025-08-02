import CustomText from '@/src/components/CustomText'
import GradientBackground from '@/src/components/GradientBackground'
import TopTabNavigator from '@/src/components/TopTabNavigator'
import { loginNavigationTabs } from '@/src/constants/constant'
import font from '@/src/constants/font'
import nomenclature from '@/src/constants/nomenclature'
import { loginTitleText } from '@/src/constants/styles'
import { StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const sign = () => {
  return (
    <SafeAreaView style={{flex:1}}>
    <GradientBackground/>
    <CustomText variant='bold' size={font.size_24} style={loginTitleText}>{nomenclature.login_text}</CustomText>
    <TopTabNavigator menuHeaders={loginNavigationTabs}/>
    </SafeAreaView>
  )
}

export default sign
export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({})