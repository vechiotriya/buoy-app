import { FontAwesome, AntDesign, Entypo, Feather, Ionicons, MaterialIcons, Octicons, MaterialCommunityIcons, SimpleLineIcons, Fontisto, FontAwesome6 } from "@expo/vector-icons";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "../hooks/ThemeContextProvider";

const iconMap = {
    MaterialCommunityIcons, Octicons, SimpleLineIcons, AntDesign, Entypo, Feather, FontAwesome,FontAwesome6, Ionicons, MaterialIcons, Fontisto
}
export type IconType = keyof typeof iconMap;
export function CustomIcon({ ...props }: {
    type: IconType
    name: React.ComponentProps<(typeof iconMap)[IconType]>['name'];
    color?: string;
    size:number;
    iconStyle?: StyleProp<TextStyle>
}) {
    const { type, name, color, iconStyle,size } = props
    const {themePalette}=useTheme()
    const IconVariant = iconMap[type]
    return <IconVariant size={size} style={iconStyle} name={name} color={color??themePalette.text}/>;
}