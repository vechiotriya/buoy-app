import { Pressable, Animated, StyleSheet } from "react-native";
import { useRef, useEffect } from "react";
import { useTheme } from "../hooks/ThemeContextProvider";
import { scale } from "../utils/scale";

export default function Switch({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: () => void;
}) {
  const translateX = useRef(new Animated.Value(value ? 22 : 2)).current;
  const { themePalette } = useTheme();
  useEffect(() => {
    Animated.spring(translateX, {
      toValue: value ? 22 : 2,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  }, [value]);

  return (
    <Pressable
      onPress={onValueChange}
      style={[styles.track, { backgroundColor: value ? themePalette.switchOn : themePalette.switchOff }]}
    >
      <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: scale(51),
    height: scale(31),
    borderRadius: 999,
    justifyContent: "center",
  },
  thumb: {
    width: scale(27),
    height: scale(27),
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: scale(2) },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});
