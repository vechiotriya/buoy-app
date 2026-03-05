import { RelativePathString } from "expo-router";
import { ViewStyle } from "react-native";

export type DashboardTabTypes = {
  name: string;
  icon: string;
  type:
    | "FontAwesome"
    | "FontAwesome6"
    | "Fontisto"
    | "MaterialCommunityIcons"
    | "Octicons"
    | "SimpleLineIcons"
    | "AntDesign"
    | "Entypo"
    | "Feather"
    | "Ionicons"
    | "MaterialIcons";
  path: '/(protected)/scan'|'/(protected)/receipt'|'/(protected)/budget';
};

export type KeypadIconButton = {
  icon: 'backspace'|'calendar-month'|'trash-can'|'check';
  color: string;
};

export type KeypadItem = string | KeypadIconButton;
