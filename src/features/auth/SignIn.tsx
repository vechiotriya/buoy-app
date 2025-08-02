import { TouchableOpacity, View} from 'react-native'
import React from 'react'
import PrimaryInput from '@/src/components/PrimaryInput'
import nomenclature from '@/src/constants/nomenclature'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import useStyles from './styles/SignInStyles'
import { primaryButtonStyle } from '@/src/constants/styles'
import CustomText from '@/src/components/CustomText'
import font from '@/src/constants/font'

const SignIn = () => {
  const {themePalette}= useTheme()
  const styles=useStyles(themePalette)
  const buttonStyle=primaryButtonStyle(themePalette)
  return (
    <View style={styles.container}>
      <PrimaryInput label={nomenclature.email} value={''} error='' />
      <PrimaryInput label={nomenclature.password} value={''} error='' secure/>
      <TouchableOpacity style={styles.forgotText}><CustomText size={font.size_14}>{nomenclature.forgot_password}</CustomText></TouchableOpacity>
      <TouchableOpacity style={buttonStyle}>
        <CustomText >{nomenclature.login}</CustomText>
      </TouchableOpacity>
    </View>
  )
}

export default SignIn