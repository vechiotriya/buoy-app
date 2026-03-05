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
      <PrimaryInput label={nomenclature.fullname} value={''} error='' />
      <PrimaryInput label={nomenclature.username} value={''} error='' />
      <PrimaryInput label={nomenclature.email} value={''} error='' />
      <PrimaryInput label={nomenclature.password} value={''} error='' secure />
      <TouchableOpacity style={buttonStyle}>
        <CustomText >{nomenclature.sign_up}</CustomText>
      </TouchableOpacity>
    </View>
  )
}

export default SignUp