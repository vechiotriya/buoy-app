import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomIcon } from "./CustomIcon";
import { useTheme } from "../hooks/ThemeContextProvider";
import { useRouter } from "expo-router";
import { scale } from "../utils/scale";
import { AppTheme } from "../constants/Colors";

const tabs = [
  { name: "/", icon: "home", type: "Feather" },
  { name: "add", icon: "add-outline", type: "Ionicons" },
  { name: "settings", icon: "settings-outline", type: "Ionicons" },
];
interface FloatingTabMenuProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const FloatingTabMenu = ({ setShowMenu }: FloatingTabMenuProps) => {
  const { themePalette } = useTheme();
  const navigate = useRouter();
  const styles = useStyles(themePalette);
  return (
    <View style={styles.container}>
      {tabs.map((route: any, index: number) => {
        const onPress = () => {
          if (route.name !== "add") navigate.push(route.name);
          else setShowMenu((prev) => !prev);
        };
        return (
          <TouchableOpacity
            key={route.name}
            onPress={onPress}
            style={[
              styles.tabButton,
              route.name === "add" && {
                borderWidth: 3,
                borderColor: themePalette.primary,
              },
            ]}
          >
            <CustomIcon
              type={route.type}
              name={route.icon}
              size={scale(24)}
              color={
                route.name === "add"
                  ? themePalette.primary
                  : themePalette.tabIconDefault
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const useStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
      paddingHorizontal: scale(25),
      paddingVertical: scale(8),
      backgroundColor: theme.menuBackground,
      borderColor: "rgba(255, 255, 255, 0.25)",
      borderWidth: 1,
      shadowColor: "#021120",
      shadowOffset: { width: scale(5), height: scale(4) },
      shadowOpacity: 1,
      shadowRadius: scale(68),
      elevation: 9,
      borderRadius: scale(68),
      width: scale(219),
      position: "absolute",
      bottom: scale(50),
      left: scale(90),
      right: scale(20),
    },
    tabButton: {
      justifyContent: "center",
      alignItems: "center",
      width: scale(44),
      height: scale(44),
      borderRadius: scale(22),
      backgroundColor: theme.menuButton,
    },
  });
};
export default FloatingTabMenu;
