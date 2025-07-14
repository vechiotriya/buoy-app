import { AppTheme } from "@/constants/Colors"

export type Mode='light'|'dark'
export interface ThemeContextType{
    themePalette:AppTheme,
    handleTheme:any,
    theme: Mode
}