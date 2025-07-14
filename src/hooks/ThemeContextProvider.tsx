import { createContext, ReactNode, useContext, useEffect, useMemo, useState, } from 'react';
// import { getLocalStorage, setLocalStorage, } from '../utils/localStorage/localStorage';
import { useColorScheme } from 'react-native';
import { AppTheme, darkTheme, lightTheme } from '@/constants/Colors';
import { Mode, ThemeContextType } from '../types/ThemeContextTypes';
const ThemeContext = createContext<ThemeContextType | null>(null);
const defaultMode = 'light';
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const colorScheme = useColorScheme();
    const [theme, setTheme] = useState<Mode>(colorScheme ?? defaultMode);
    console.log("clr", colorScheme, defaultMode);

    const themePalette: AppTheme = useMemo(() => {
        return theme === defaultMode ? lightTheme : darkTheme;
    }, [theme]);

    const getTheme = async () => {
        try {
            const savedTheme: Mode | null = null
            const localTheme = savedTheme ?? colorScheme ?? defaultMode;
            setTheme(localTheme);
        }
        catch (error) {
            console.log('Error loading theme:', error);
        }
    };

    const handleTheme = (mode: Mode) => {
        setTheme(mode);
        // setLocalStorage('theme', mode);
    };

    useEffect(() => {
        getTheme();
    }, []);

    return (
    <ThemeContext.Provider value= {{themePalette, handleTheme,theme}}>
    { children }
    </ThemeContext.Provider> 
); 
}
export { ThemeProvider, ThemeContext };
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within an ThemeProvider');
    }
    return context;
};