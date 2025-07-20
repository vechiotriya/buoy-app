import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomIcon } from '@/src/components/CustomIcon'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import { AppTheme } from '@/constants/Colors'

const AddFloatingButton = () => {
    const { themePalette } = useTheme()
    const styles=useStyles(themePalette)
    return (
        <Pressable style={styles.buttonContainer} onPress={() => console.log('Add Button Pressed')}>
            <CustomIcon name='plus' type='Entypo' size={45} />
        </Pressable>
    )
}

export default AddFloatingButton

const useStyles =(theme:AppTheme)=> StyleSheet.create({
    buttonContainer: { 
        width: 55,
        height: 55,
        borderRadius: 30, 
        backgroundColor: theme.primary, 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'absolute', 
        // top: '70%', 
        bottom:'5%',
        right: '5%', 
        zIndex:20,
        elevation: 5 
    }
})