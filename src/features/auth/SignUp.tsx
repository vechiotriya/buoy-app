import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import useStyles from './styles/SignUpStyles'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import PrimaryInput from '@/src/components/PrimaryInput'
import nomenclature from '@/src/constants/nomenclature'
import CustomText from '@/src/components/CustomText'
import { primaryButtonStyle } from '@/src/constants/styles'

const SignUp = () => {
  const { themePalette } = useTheme()
  const styles = useStyles(themePalette)
  const buttonStyle = primaryButtonStyle(themePalette)

  return (
    <View style={styles.container}>
      <PrimaryInput label={nomenclature.FULLNAME} value={''} error='' />
      <PrimaryInput label={nomenclature.USERNAME} value={''} error='' />
      <PrimaryInput label={nomenclature.EMAIL} value={''} error='' />
      <PrimaryInput label={nomenclature.PASSWORD} value={''} error='' secure />
      <TouchableOpacity style={buttonStyle}>
        <CustomText >{nomenclature.SIGN_UP}</CustomText>
      </TouchableOpacity>
    </View>
  )
}

export default SignUp