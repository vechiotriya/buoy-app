import { scale } from "@/src/utils/scale";
import { StyleSheet } from "react-native";

export const useStyles=()=>{
    return StyleSheet.create({
  container: {
    paddingHorizontal: scale(22),
    paddingTop: scale(24),
  },
  selectContainer: {
    height: scale(45),
    borderRadius: scale(13),
  },
  label: { marginTop: scale(24), marginBottom: scale(4) },
});
}