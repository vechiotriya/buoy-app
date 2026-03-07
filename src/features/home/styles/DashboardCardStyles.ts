import { AppTheme } from "@/src/constants/Colors";
import { scale } from "@/src/utils/scale";
import { StyleSheet } from "react-native";

export const useStyle = (theme: AppTheme) => StyleSheet.create({
    cardContainer: {
        paddingTop: scale(17),
        paddingBottom: scale(10),
        maxHeight: scale(204),
        width: 'auto',
        marginHorizontal: scale(24),
        backgroundColor: theme.primaryCard,
        borderRadius: scale(16),
    },
        infoRowContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: scale(20),
            alignItems: 'flex-start',
        },
    })