import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import CustomText from '@/src/components/CustomText'
import font from '@/src/constants/font'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import { Picker } from '@react-native-picker/picker'
import { keypadLayout } from '@/src/constants/constant'
import KeypadButton from './KeypadButton'
import DatePicker, { SingleOutput } from 'react-native-neat-date-picker'

interface AddTransactionSheetProps {
  type: 'expense' | 'income',
  closeSheet: Function
}

const AddTransactionSheet = ({ type, closeSheet }: AddTransactionSheetProps) => {
  const [amount, setAmount] = useState<string>();
  const [comment, setComment] = useState<string>();
  const [date, setDate] = useState<Date>(new Date());
  const { themePalette } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const backspace = () => {
    setAmount((prev) => prev?.slice(0, prev.length - 1))
  }
  const openCalendar = () => {
    setShowDatePicker(true)
  }
  const onCancel = () => {
    setShowDatePicker(false)
  }
  const onConfirm = (output: SingleOutput) => {
    setShowDatePicker(false)
    setDate(prev => output.date ?? prev)
  }
  const clear = () => {
    setAmount('0')
  }
  const submit = () => {
    closeSheet()
  }
  const keypadAction = (operation: string) => {
    if (operation == 'backspace') return backspace()
    if (operation == 'calendar-month') return openCalendar()
    if (operation == 'trash-can') return clear()
    if (operation == 'check') return submit()
  }
  return (
    <BottomSheetView style={{ paddingHorizontal: 16, paddingVertical: '3%' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <CustomText variant='bold' color={themePalette.inputText} size={font.size_14}>{`Date: ${date.toDateString().split(' ').slice(1).join(' ')}`}</CustomText>
        <Picker selectedValue={'java'}
          mode="dropdown"
          style={{ fontFamily: 'poppins-bold', color: themePalette.text }}></Picker>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 30 }}>
        <CustomText color={themePalette.inputText}>{type.at(0)?.toUpperCase() + type.substring(1)}</CustomText>
        <View style={{ flexDirection: 'row' }}>
          <CustomText color={themePalette.inputText2} size={font.size_32} style={{ textAlignVertical: 'center' }}>₹</CustomText>
          <TextInput placeholder='0' placeholderTextColor={themePalette.secondaryText} value={amount} showSoftInputOnFocus={false} keyboardType='numeric' onChangeText={(text) => {
            const numericOnly = text.replace(/[^0-9.]/g, '');
            setAmount(numericOnly)
          }} style={{ color: themePalette.secondaryText, fontSize: font.size_50, borderWidth: 0, fontFamily: 'poppins-bold' }} onFocus={() => {
            Keyboard.dismiss()
          }}
            contextMenuHidden
          ></TextInput>
        </View>
        <TextInput placeholder='Add a comment...' value={comment} maxLength={50} onChangeText={(text) => {
          setComment(text)
        }} style={{ fontSize: font.size_14, borderWidth: 0, fontFamily: 'poppins-regular' }}></TextInput>
      </View>
      <DatePicker
        isVisible={showDatePicker}
        mode={'single'}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
      <View style={{ rowGap: 4 }}>
        {keypadLayout.map((row) => {
          return (
            <View style={{ flexDirection: 'row', columnGap: 4, justifyContent: 'center' }}>
              {row.map((rowItem) => {
                if (typeof rowItem == 'string' || rowItem == null) {
                  return (<KeypadButton backgroundColor={themePalette.keypadButton} label={rowItem ?? ''} onPress={() => {
                    setAmount((prev) => {
                      console.log(rowItem, prev);

                      if ((prev == '0' || prev == undefined || !prev) && rowItem !== '.') prev = ''
                      if ((prev === '.' || prev?.includes('.')) && rowItem === '.')
                        return prev
                      else
                        return prev + rowItem
                    })
                  }} />)
                }
                return (<KeypadButton backgroundColor={rowItem.color} label={rowItem.icon} icon={rowItem.icon} style={rowItem.icon == 'check' ? { width: 168 } : {}} onPress={() => { keypadAction(rowItem.icon) }} />)
              })}
            </View>
          )
        })}
      </View>
    </BottomSheetView>
  )
}

export default AddTransactionSheet

const styles = StyleSheet.create({})