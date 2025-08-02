import { TextStyle } from "react-native";
import { AppTheme } from "./Colors";

export const primaryButtonStyle: Function = (theme: AppTheme) => ({
    borderRadius: 8,
    paddingHorizontal: '17%',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 55,
    backgroundColor: theme.primary,
    width: '96%',
    marginTop: '5%'
});
export const loginTitleText:TextStyle = (
    { textAlign: 'left', width: '55%', marginVertical: '11%', marginLeft: '7%', letterSpacing: 4 }
);