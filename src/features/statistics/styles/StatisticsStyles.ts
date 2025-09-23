import { AppTheme } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const useStyle = (theme: AppTheme) => StyleSheet.create({
    overviewCard:{
        borderRadius:16,
        height:132,
        paddingLeft:24,
        marginLeft:'5%',
        paddingTop:24,
        width:'91%',
        backgroundColor:theme.primaryCard,
        color:theme.secondaryText,
        marginBottom:22
    }
    })