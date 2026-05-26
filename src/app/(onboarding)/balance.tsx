import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import PrimaryInput from '@/src/components/PrimaryInput'
import { scale } from '@/src/utils/scale'
import font from '@/src/constants/font'
import CustomText from '@/src/components/CustomText'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import { CustomIcon } from '@/src/components/CustomIcon'
import { useDispatch } from 'react-redux'
import { setInitialBalance, setOnboarded } from '@/src/store/slices/authSlice'

const SetBalance = () => {
  const { themePalette } = useTheme();
  const [balance, setBalance] = useState("");
  const dispatch = useDispatch();
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       <CustomText style={{marginLeft:scale(20),marginBottom:scale(20)}} size={font.size_24}>Lets start by entering your current balance</CustomText>
       <PrimaryInput value={balance} error={balance.match(/[^0-9]/)?"Enter a valid number":""} onChangeText={setBalance} style={{height:scale(70),fontSize:font.size_24}}/>
       <TouchableOpacity
               style={{
                 width: scale(70),
                 aspectRatio: 1,
                 alignSelf: "flex-end",
                 borderRadius: scale(50),
                 justifyContent: "center",
                 alignItems: "center",
                 borderWidth: 2,
                 borderColor: themePalette.borderColor,
                 marginRight: scale(50),
                 marginTop: scale(80),
               }}
               disabled={balance.length === 0 || balance.match(/[^0-9]/) !== null}
               onPress={() => {
                 dispatch(setInitialBalance(Number(balance)));
                 dispatch(setOnboarded());
               }}
             >
               <CustomIcon
                 name="arrow-right"
                 type="Feather"
                 size={scale(30)}
                 color={themePalette.text}
                 iconStyle={{ marginBottom: -3 }}
               />
             </TouchableOpacity>
    </View>
  )
}

export default SetBalance