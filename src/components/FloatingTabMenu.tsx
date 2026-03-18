import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomIcon } from "./CustomIcon";
import { useTheme } from "../hooks/ThemeContextProvider";
import { useRouter } from "expo-router";
import { scale } from "../utils/scale";

const tabs = [
  { name: "statistics", icon: "graph", type: "SimpleLineIcons" },
  { name: "add", icon: "add-outline", type: "Ionicons" },
  { name: "settings", icon: "settings-outline", type: "Ionicons" },
];
const FloatingTabMenu = () => {
  const { themePalette } = useTheme();
  const navigate = useRouter();

  return (
    <View style={styles.container}>
      {tabs.map((route: any, index: number) => {
        const onPress = () => {
          navigate.push(route.name);
        };
        return (
          <TouchableOpacity
            key={route.name}
            onPress={onPress}
            style={[styles.tabButton,route.name === "add" && {borderWidth:3,borderColor: 'rgba(30, 133, 183, 0.64)'}]}
          >
            <CustomIcon
              type={route.type}
              name={route.icon}
              size={scale(24)}
              color={route.name === "add"?themePalette.primary:themePalette.tabIconDefault}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: scale(25),
    paddingVertical: scale(8),
    backgroundColor: "rgba(202, 232, 248, 0.86)",
    borderColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1,
    shadowColor: "#021120",
    shadowOffset: { width: scale(5), height: scale(4) },
    shadowOpacity: 1,
    shadowRadius: scale(68),
    elevation: 9,
    borderRadius: scale(68),
    width:scale(219),
    position: "absolute",
    bottom: scale(40),
    left: scale(90),
    right: scale(20),
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: "rgba(255, 255, 255, 0.97)",
  },
});
export default FloatingTabMenu;
