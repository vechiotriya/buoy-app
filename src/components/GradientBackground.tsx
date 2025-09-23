import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { AppTheme } from '../constants/Colors'

interface GradientBackgroundProps {
  appTheme: AppTheme; 
}
const GradientBackground:React.FC<GradientBackgroundProps> = ({appTheme}) => {
    
    return (
        <LinearGradient
            // Background Linear Gradient
            colors={[appTheme.backgroundGradient1, appTheme.backgroundGradient2,]}
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