import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { CustomIcon } from "@/src/components/CustomIcon";
import { BlurView } from "expo-blur";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { primaryButtonStyle } from "@/src/constants/styles";
import nomenclature from "@/src/constants/nomenclature";
import { scale } from "@/src/utils/scale";
import { useGetUserDetailsQuery } from "@/src/features/home/slices/api/userApi";

const Profile = () => {
  const { themePalette } = useTheme();
  const buttonStyle = primaryButtonStyle(themePalette);
  const { data, isLoading } = useGetUserDetailsQuery({});
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileImageContainer}>
        <Image
          source={{
            uri: "https://content.latest-hairstyles.com/wp-content/uploads/long-wavy-pixie-cut-with-curls.jpg",
            width: scale(130),
            height: scale(130),
          }}
          style={styles.profileImage}
        />
        <View
          style={{
            position: "absolute",
            bottom: 1,
            right: 2,
            width: 45,
            height: 45,
            borderRadius: 25,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomIcon
            name="camera-outline"
            type="Ionicons"
            size={25}
            color="#1E85B7"
          />
        </View>
      </TouchableOpacity>
      <BlurView intensity={30} tint="light" style={styles.menu}>
        <View style={styles.row}>
          <CustomText size={font.size_14}>{nomenclature.FULLNAME}</CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText size={font.size_14}>{data?.fullName}</CustomText>
            <TouchableOpacity>
              <CustomIcon
                name="pencil"
                type="Entypo"
                size={scale(20)}
                color="#fff"
                iconStyle={{ marginLeft: scale(8), marginBottom: scale(6) }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <CustomText size={font.size_14}>{nomenclature.EMAIL}</CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText size={font.size_14}>{data?.email}</CustomText>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <CustomText size={font.size_14}>{nomenclature.USERNAME}</CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText size={font.size_14}>{data?.username}</CustomText>
          </View>
        </View>
      </BlurView>
      <TouchableOpacity
        style={[buttonStyle, {marginTop: scale(100),width: scale(360) }]}
      >
        <CustomText>Save Changes</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: scale(35),
  },
  profileImage: {
    borderRadius: scale(75),
    width: scale(150),
    height: scale(150),
    borderWidth: 4,
    borderColor: "#fff",
  },
  profileImageContainer: {
    position: "relative",
  },
  menu: {
    borderRadius: scale(25),
    padding: scale(16),
    width: scale(360),
    marginTop: scale(46),
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    height: scale(1),
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: scale(12),
  },
});
