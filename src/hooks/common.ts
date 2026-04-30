import { useRef } from "react"
import { AppTheme } from "../constants/Colors"

export const pickColor=(themePalette:AppTheme)=>{
    themePalette.donutChartColors[Math.floor(Math.random() * themePalette.donutChartColors.length)]
}

export const useDebounceValue=(debouncedFunction:Function,delay:number)=>{
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
    return (...args)=>{
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(()=>{
            debouncedFunction(...args)
        },delay)
    }
}