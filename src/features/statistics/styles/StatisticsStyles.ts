import { AppTheme } from "@/src/constants/Colors";
import { scale } from "@/src/utils/scale";
import { StyleSheet } from "react-native";

export const useStyle = (theme: AppTheme) => StyleSheet.create({
    overviewCard:{
        borderRadius:scale(16),
        paddingHorizontal:scale(24),
        marginLeft:scale(20),
        paddingVertical:scale(24),
        width:scale(360),
        backgroundColor:theme.primaryCard,
        color:theme.secondaryText,
        marginBottom:scale(22)
    }
    })