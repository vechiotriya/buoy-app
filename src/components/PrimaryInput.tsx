import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import font from '../constants/font'
import { AppTheme } from '../constants/Colors'
import { useTheme } from '../hooks/ThemeContextProvider'

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
      {label && <CustomText size={font.size_14} style={{ marginBottom: 6 }}>{label}</CustomText>}
      <TextInput value={value} style={[styles.inputText, style]} returnKeyType={returnKeyType} placeholder={label ? 'Enter your ' + label.toLowerCase() : placeholder} secureTextEntry={secure} onChangeText={onChangeText} onSubmitEditing={onSubmitEditing}></TextInput>
      {error && <CustomText size={font.size_12} color={themePalette.errorText} variant='bold' style={{ marginTop: 3 }}>{error}</CustomText>}
    </View>
  )
}

export default PrimaryInput

const useStyles = (theme: AppTheme) => StyleSheet.create({
  inputText: {
    backgroundColor: theme.background,
    fontFamily: 'poppins-regular',
    fontSize: 16,
    color: theme.inputText,
    paddingLeft: 16,
    paddingVertical: 5,
    borderRadius: 12,
    minHeight: 45,
    width: '90%'
  },
  container: { 
    justifyContent: 'center',
    marginBottom:'6%'
  }
})