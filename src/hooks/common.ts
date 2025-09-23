import { AppTheme } from "../constants/Colors"

export const pickColor=(themePalette:AppTheme)=>{
    themePalette.donutChartColors[Math.floor(Math.random() * themePalette.donutChartColors.length)]
}