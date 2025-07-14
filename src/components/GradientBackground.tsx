import React from 'react'
import { useTheme } from '../hooks/ThemeContextProvider'
import { LinearGradient } from 'expo-linear-gradient'

const GradientBackground = () => {
    const { themePalette } = useTheme()
    return (
        <LinearGradient
            // Background Linear Gradient
            colors={[themePalette.backgroundGradient1, themePalette.backgroundGradient2,]}
            locations={[0.4, 0.79]}
            dither={false}
            style={{
                flex: 1,
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: '100%',
            }}
        />
    )
}

export default GradientBackground