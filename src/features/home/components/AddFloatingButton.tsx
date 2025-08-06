import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { CustomIcon } from '@/src/components/CustomIcon'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import { AppTheme } from '@/src/constants/Colors'
import { SvgFromUri, SvgFromXml } from 'react-native-svg'
import { card, moneyBag, piggyBank } from '@/src/constants/icons'

const AddFloatingButton = () => {
    const { themePalette } = useTheme()
    const [menuShown,setMenuShown]=useState(false)
    const styles = useStyles(themePalette)
    return (
        <View style={styles.container}>

            <Pressable style={[styles.miniButtonContainer, styles.miniButton2,menuShown&&{display:'flex'}]}>
                <SvgFromXml xml={piggyBank}/>
            </Pressable>
            <Pressable style={[styles.miniButtonContainer, styles.miniButton3,menuShown&&{display:'flex'}]}>
                <SvgFromXml xml={card}/>
            </Pressable>
            <Pressable style={[styles.miniButtonContainer,menuShown&&{display:'flex'}]}>
                <SvgFromXml xml={moneyBag}/>
            </Pressable>
            <Pressable style={[styles.buttonContainer,menuShown&&{backgroundColor:themePalette.tabIconDefault}]} onPress={() => {setMenuShown((prev)=>!prev)}}>
                <CustomIcon name='plus' type='Entypo' size={45} />
            </Pressable>
        </View>
    )
}

export default AddFloatingButton

const useStyles = (theme: AppTheme) => StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: '5%',
        right: '5%',
    },
    buttonContainer: {
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
        elevation: 5
    },
    miniButtonContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
        elevation: 5,
        position: 'relative',
        bottom: 8,
        left: 9,
        display:'none'
    },
    miniButton2: {
        position: 'relative',
        left: '-85%',
        top: '80%'
    },
    miniButton3: {
        position: 'relative',
        left: '-60%',
        top: '30%'
    }
})