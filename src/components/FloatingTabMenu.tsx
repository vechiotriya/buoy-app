import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CustomIcon } from "./CustomIcon";
import { useTheme } from "../hooks/ThemeContextProvider";
import { useRouter } from "expo-router";

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
              size={24}
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
    paddingHorizontal: 25,
    paddingVertical: 8,
    backgroundColor: "rgba(171, 219, 244, 0.7)",
    borderColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1,
    shadowColor: "#021120",
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 6,
    borderRadius: 68,
    width:219,
    position: "absolute",
    bottom: 45,
    left: 90,
    right: 20,
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.97)",
  },
});
export default FloatingTabMenu;
