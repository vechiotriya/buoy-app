import CustomText from '@/src/components/CustomText'
import GradientBackground from '@/src/components/GradientBackground'
import TopTabNavigator from '@/src/components/TopTabNavigator'
import { loginNavigationTabs } from '@/src/constants/constant'
import font from '@/src/constants/font'
import nomenclature from '@/src/constants/nomenclature'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const sign = () => {
  return (
    <SafeAreaView style={{flex:1}}>
    <GradientBackground/>
    <CustomText variant='bold' size={font.size_24} style={{textAlign:'left',width:'55%',marginVertical:'15%',marginLeft:'7%',letterSpacing:4}}>{nomenclature.login_text}</CustomText>
    <TopTabNavigator menuHeaders={loginNavigationTabs}/>
    </SafeAreaView>
  )
}

export default sign
export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({})