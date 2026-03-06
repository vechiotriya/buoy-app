import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { CustomIcon } from "@/src/components/CustomIcon";
import { BlurView } from "expo-blur";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { primaryButtonStyle } from "@/src/constants/styles";

const Profile = () => {
  const { themePalette } = useTheme();
  const buttonStyle = primaryButtonStyle(themePalette);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileImageContainer}>
        <Image
          source={{
            uri: "https://content.latest-hairstyles.com/wp-content/uploads/long-wavy-pixie-cut-with-curls.jpg",
            width: 130,
            height: 130,
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
          <CustomText size={font.size_14}>Full name</CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText size={font.size_14}>Alex Martin</CustomText>
            <TouchableOpacity>
              <CustomIcon
                name="pencil"
                type="Entypo"
                size={20}
                color="#fff"
                iconStyle={{ marginLeft: 8, marginBottom: 6 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <CustomText size={font.size_14}>Email</CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText size={font.size_14}>amartin@gmail.com</CustomText>
            <TouchableOpacity>
              <CustomIcon
                name="pencil"
                type="Entypo"
                size={20}
                color="#fff"
                iconStyle={{ marginLeft: 8, marginBottom: 6 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <CustomText size={font.size_14}>Username</CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText size={font.size_14}>@martin95</CustomText>
            <TouchableOpacity>
              <CustomIcon
                name="pencil"
                type="Entypo"
                size={20}
                color="#fff"
                iconStyle={{ marginLeft: 8, marginBottom: 6 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
      <TouchableOpacity
        style={[buttonStyle, {marginTop:'20%',width:'90%' }]}
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
    paddingTop: "15%",
  },
  profileImage: {
    borderRadius: 75,
    width: 150,
    height: 150,
    borderWidth: 4,
    borderColor: "#fff",
  },
  profileImageContainer: {
    position: "relative",
  },
  menu: {
    borderRadius: 25,
    padding: 16,
    width: "90%",
    marginTop: 46,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: 12,
  },
});
