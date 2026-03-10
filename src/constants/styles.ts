import { TextStyle } from "react-native";
import { AppTheme } from "./Colors";
import { scale } from "../utils/scale";

export const primaryButtonStyle: Function = (theme: AppTheme) => ({
    borderRadius: scale(8),
    paddingHorizontal: scale(17),
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: scale(55),
    backgroundColor: theme.primary,
    width: scale(358),
    marginTop: scale(20)
});
export const loginTitleText:TextStyle = (
    { textAlign: 'left', width: '55%', marginTop: scale(60),marginBottom:scale(40), marginLeft: '7%', letterSpacing: 4 }
);