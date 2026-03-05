import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import CustomText from '@/src/components/CustomText'
import { CustomIcon, IconType } from '@/src/components/CustomIcon'
import { RelativePathString, useRouter } from 'expo-router'
import { AppTheme } from '@/src/constants/Colors'
import { DashboardTabTypes } from '../types/types'


export default ({ name, icon, type, path }:DashboardTabTypes) => {
    const { themePalette } = useTheme()
    const navigation=useRouter()
    const styles = useStyles(themePalette)
    return (
        <TouchableOpacity style={styles.container} onPress={() =>{ 
            navigation.navigate(path)
        }}>
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

