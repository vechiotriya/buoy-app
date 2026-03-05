import { AppTheme } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const useStyle = (theme: AppTheme) => StyleSheet.create({
    cardContainer: {
        paddingTop: 17,
        paddingBottom: 10,
        maxHeight: 204,
        width: 'auto',
        marginHorizontal: '6%',
        backgroundColor: theme.primaryCard,
        borderRadius: 16,
    },
        infoRowContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
            alignItems: 'flex-start',
        },
    })