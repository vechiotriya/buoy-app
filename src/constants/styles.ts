import { TextStyle } from "react-native";
import { AppTheme } from "./Colors";
import { scale } from "../utils/scale";

export const primaryButtonStyle: Function = (theme: AppTheme,disabled:boolean=false) => ({
    borderRadius: scale(12),
    paddingHorizontal: scale(17),
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: scale(55),
    backgroundColor: !disabled ?theme.primary : theme.primaryDisabled,
    width: scale(358),
    marginTop: scale(20)
});
export const loginTitleText:TextStyle = (
    { textAlign: 'left', width: '55%', marginTop: scale(60),marginBottom:scale(40), marginLeft: '7%', letterSpacing: 4 }
);