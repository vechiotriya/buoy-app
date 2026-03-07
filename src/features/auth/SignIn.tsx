import { TouchableOpacity, View} from 'react-native'
import React from 'react'
import PrimaryInput from '@/src/components/PrimaryInput'
import nomenclature from '@/src/constants/nomenclature'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import useStyles from './styles/SignInStyles'
import { primaryButtonStyle } from '@/src/constants/styles'
import CustomText from '@/src/components/CustomText'
import font from '@/src/constants/font'
import { CustomIcon } from '@/src/components/CustomIcon'
import { scale } from '@/src/utils/scale'
import SocialFooter from './SocialFooter'

const SignIn = () => {
  const {themePalette}= useTheme()
  const styles=useStyles(themePalette)
  const buttonStyle=primaryButtonStyle(themePalette)
  return (
    <View style={styles.container}>
      <PrimaryInput label={nomenclature.EMAIL} value={''} error='' />
      <PrimaryInput label={nomenclature.PASSWORD} value={''} error='' secure/>
      <TouchableOpacity style={styles.forgotText}><CustomText size={font.size_14}>{nomenclature.FORGOT_PASSWORD}</CustomText></TouchableOpacity>
      <TouchableOpacity style={buttonStyle}>
        <CustomText >{nomenclature.LOGIN}</CustomText>
      </TouchableOpacity>
      <SocialFooter/>
    </View>
  )
}

export default SignIn