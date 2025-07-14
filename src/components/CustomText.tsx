import { StyleSheet, Text, TextStyle, TextProps } from 'react-native';
import React from 'react';
import { useTheme } from '../hooks/ThemeContextProvider';

interface CustomTextProps {
    style?: TextStyle;
    variant?: 'regular' | 'bold';
    color?: string;
    size?: number;
    children: string;
}

const CustomText: React.FC<CustomTextProps> = ({
    style,
    variant = 'regular',
    color,
    size = 16,
    children
}) => {
    const { themePalette } = useTheme();

    return (
        <Text
            style={[
                {
                    fontFamily: variant === 'bold' ? 'poppins-bold' : 'poppins-regular',
                    fontSize: size,
                    color: color ?? themePalette.text,
                },
                style,
            ]}
        >
            {children}
        </Text>
    );
};

export default CustomText;
