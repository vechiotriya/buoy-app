import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppTheme } from '@/constants/Colors'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import CustomText from '@/src/components/CustomText'
import { CustomIcon, IconType } from '@/src/components/CustomIcon'

type MenuTabProps = {
    name: string,
    icon: string,
    type: IconType,
}
export default ({ name, icon, type }:MenuTabProps) => {
    const { themePalette } = useTheme()
    const styles = useStyles(themePalette)
    return (
        <TouchableOpacity style={styles.container} onPress={() => console.log(name)}>
            <CustomIcon
                name={icon}
                type={type}
                size={21}
                color={themePalette.text} 
                iconStyle={{ marginBottom: 6 }}
                />
            <CustomText>{name}</CustomText>
        </TouchableOpacity>
    )
}

const useStyles = (theme: AppTheme) => StyleSheet.create({
    container: {
        height: 90,
        width: 103,
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    }
}
)

