import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import CustomText from "@/src/components/CustomText";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import font from "@/src/constants/font";
import nomenclature from "@/src/constants/nomenclature";
import { AppTheme } from "@/src/constants/Colors";
import { normalize, scale } from "@/src/utils/scale";
import { useGetUserDetailsQuery } from "../../../services/userApi";
import { CustomIcon } from "@/src/components/CustomIcon";
import { ErrorBoundaryProps } from "expo-router";
import { normalizeError } from "@/src/utils/error";

const ProfileSection = () => {
  const { themePalette } = useTheme();
  const styles = useStyles(themePalette);
  const { data, error } = useGetUserDetailsQuery({});
  if (error) {
  console.log("API error", error);
  throw normalizeError(error as Error);
}
  return (
    <View style={styles.profileContainer}>
      <View style={{}}>
        <CustomText variant="bold" size={font.size_24}>
          {"Hello, " + data?.fullName.split(" ")[0]}
        </CustomText>
        <CustomText size={font.size_14}>{nomenclature.BEGIN_TEXT}</CustomText>
      </View>
      {data?.profile ? (
        <Image
          source={{ uri: data?.profile, width: 70, height: 70 }}
          style={styles.profileImage}
        ></Image>
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderRadius: scale(60),
            height: scale(50),
            aspectRatio: 1,
            padding: scale(5),
            borderColor: themePalette.borderSecondary,
            marginRight: scale(24),
          }}
        >
          <CustomIcon
            name="user"
            type="FontAwesome"
            size={scale(20)}
            color={themePalette.borderSecondary}
          />
        </View>
      )}
    </View>
  );
};

const useStyles = (theme: AppTheme) =>
  StyleSheet.create({
    profileContainer: {
      marginLeft: scale(24),
      paddingTop: scale(15),
      flexDirection: "row",
      justifyContent: "space-between",
    },
    profileImage: {
      borderRadius: scale(40),
      marginRight: scale(24),
      borderWidth: scale(4),
      borderColor: theme.tint,
    },
  });
export default ProfileSection;
