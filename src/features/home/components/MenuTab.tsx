import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/src/hooks/ThemeContextProvider'
import CustomText from '@/src/components/CustomText'
import { CustomIcon, IconType } from '@/src/components/CustomIcon'
import { RelativePathString, useRouter } from 'expo-router'
import { AppTheme } from '@/src/constants/Colors'
import { DashboardTabTypes } from '../types/types'
import { scale } from '@/src/utils/scale'


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
                size={scale(21)}
                color={themePalette.text}
                iconStyle={{ marginBottom: scale(6) }}
            />
            <CustomText>{name}</CustomText>
        </TouchableOpacity>
    )
}

const useStyles = (theme: AppTheme) => StyleSheet.create({
    container: {
        height: scale(87),
        width: scale(98),
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(16),
    }
}
)

