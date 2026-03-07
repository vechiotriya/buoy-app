import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import font from '../constants/font'
import { AppTheme } from '../constants/Colors'
import { useTheme } from '../hooks/ThemeContextProvider'
import { scale } from '../utils/scale'

interface PrimaryInputProps {
  label?: string,
  value: string,
  error?: string,
  secure?:boolean,
  style?: TextInputProps
  placeholder?: string
  onChangeText?: (text: string) => void
  onSubmitEditing?: () => void
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send'
}
const PrimaryInput = ({ label, value, error, secure, style, placeholder, onChangeText, onSubmitEditing, returnKeyType }: PrimaryInputProps) => {
  const { themePalette } = useTheme()
  const styles = useStyles(themePalette)
  return (
    <View style={styles.container}>
      {label && <CustomText size={font.size_14} style={{ marginBottom: scale(6) }}>{label}</CustomText>}
      <TextInput value={value} style={[styles.inputText, style]} returnKeyType={returnKeyType} placeholder={label ? 'Enter your ' + label.toLowerCase() : placeholder} secureTextEntry={secure} onChangeText={onChangeText} onSubmitEditing={onSubmitEditing}></TextInput>
      {error && <CustomText size={font.size_12} color={themePalette.errorText} variant='bold' style={{ marginTop: scale(3) }}>{error}</CustomText>}
    </View>
  )
}

export default PrimaryInput

const useStyles = (theme: AppTheme) => StyleSheet.create({
  inputText: {
    backgroundColor: theme.background,
    fontFamily: 'poppins-regular',
    fontSize: font.size_14,
    color: theme.inputText,
    paddingLeft: scale(16),
    paddingVertical: scale(5),
    borderRadius: scale(12),
    minHeight: scale(45),
    width: scale(360)
  },
  container: { 
    justifyContent: 'center',
    marginBottom: scale(24)
  }
})