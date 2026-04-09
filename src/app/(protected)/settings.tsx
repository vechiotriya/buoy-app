import { CustomIcon } from "@/src/components/CustomIcon";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import nomenclature from "@/src/constants/nomenclature";
import { primaryButtonStyle } from "@/src/constants/styles";
import { useGetUserDetailsQuery } from "@/src/features/home/slices/api/userApi";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { loggedOut } from "@/src/store/slices/authSlice";
import { scale } from "@/src/utils/scale";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Image, Switch, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

import { Text, View } from "react-native";
import { useDispatch } from "react-redux";

export default function Settings() {
  const { themePalette } = useTheme();
  const buttonStyle = primaryButtonStyle(themePalette);
  const route = useRouter();
  const dispatch = useDispatch();
  const { data } = useGetUserDetailsQuery({});

  return (
    <View style={styles.container}>
      <BlurView intensity={30} tint="light" style={styles.card}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => route.push("/profile")}
        >
          <View style={styles.profile}>
            <Image
              source={{
                uri: "https://content.latest-hairstyles.com/wp-content/uploads/long-wavy-pixie-cut-with-curls.jpg",
                width: scale(70),
                height: scale(70),
              }}
              style={styles.avatar}
            ></Image>

            <View>
              <CustomText variant="bold">{data.fullName}</CustomText>
              <CustomText style={styles.username}>{'@'+data.username}</CustomText>
            </View>
          </View>
          <CustomIcon
            type="Ionicons"
            name="chevron-forward"
            size={scale(20)}
            color="#fff"
          />
        </TouchableOpacity>
      </BlurView>

      <BlurView intensity={30} tint="light" style={styles.menu}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <CustomIcon
              type="Ionicons"
              name="notifications-off-outline"
              size={scale(18)}
              color="#fff"
              iconStyle={{ marginBottom: scale(1) }}
            />
            <CustomText>{nomenclature.PAUSE_NOTIFICATIONS}</CustomText>
          </View>

          <Switch />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <CustomIcon
              type="Ionicons"
              name="refresh-outline"
              size={scale(18)}
              color="#fff"
              iconStyle={{ marginBottom: scale(1) }}
            />
            <CustomText>{nomenclature.RESET_PASSWORD}</CustomText>
          </View>
        </View>
      </BlurView>

      {/* Preferences */}
      <BlurView intensity={30} tint="light" style={styles.menu}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <CustomIcon
              type="Ionicons"
              name="moon-outline"
              size={scale(18)}
              color="#fff"
              iconStyle={{ marginBottom: scale(1) }}
            />
            <CustomText>{nomenclature.DARK_MODE}</CustomText>
          </View>

          <Switch />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <CustomIcon
              type="Ionicons"
              name="language-outline"
              size={scale(18)}
              color="#fff"
              iconStyle={{ marginBottom: scale(1) }}
            />
            <CustomText>{nomenclature.LANGUAGE}</CustomText>
          </View>

          <View style={styles.rowRight}>
            <CustomText style={styles.value}>English</CustomText>
            <CustomIcon
              type="Ionicons"
              name="chevron-forward"
              size={scale(18)}
              color="#fff"
              iconStyle={{ marginBottom: scale(1) }}
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <CustomIcon
              type="Ionicons"
              name="logo-bitcoin"
              size={scale(18)}
              color="#fff"
              iconStyle={{ marginBottom: scale(1) }}
            />
            <CustomText>{nomenclature.CURRENCY}</CustomText>
          </View>

          <View style={styles.rowRight}>
            <CustomText style={styles.value}>INR</CustomText>
            <CustomIcon
              type="Ionicons"
              name="chevron-forward"
              size={scale(18)}
              color="#fff"
              iconStyle={{ marginBottom: scale(1) }}
            />
          </View>
        </View>
      </BlurView>

      {/* About */}
      <BlurView intensity={30} tint="light" style={styles.menu}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <CustomIcon
              type="Ionicons"
              name="layers-outline"
              size={scale(18)}
              color="#fff"
              iconStyle={{ marginBottom: scale(1) }}
            />
            <CustomText>{nomenclature.VERSION}</CustomText>
          </View>

          <CustomText style={styles.value}>1.0.0</CustomText>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <CustomIcon
              type="Ionicons"
              name="information-circle-outline"
              size={scale(18)}
              color="#fff"
              iconStyle={{ marginBottom: scale(1) }}
            />
            <CustomText>{nomenclature.ABOUT}</CustomText>
          </View>

          <CustomIcon
            type="Ionicons"
            name="chevron-forward"
            size={scale(18)}
            color="#fff"
            iconStyle={{ marginBottom: scale(1) }}
          />
        </View>
      </BlurView>

      {/* Logout */}
      <TouchableOpacity
        style={[
          buttonStyle,
          { flexDirection: "row", gap: scale(8), width: scale(360) },
        ]}
        onPress={() => dispatch(loggedOut())}
      >
        <CustomIcon
          type="Ionicons"
          name="log-out-outline"
          size={scale(20)}
          color="#fff"
          iconStyle={{ marginBottom: scale(2) }}
        />
        <CustomText style={styles.logoutText}>{nomenclature.LOGOUT}</CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: scale(20),
  },
  title: {
    fontSize: scale(20),
    fontWeight: "bold",
  },
  menu: {
    borderRadius: 25,
    padding: scale(16),
    width: scale(360),
    marginBottom: scale(16),
    overflow: "hidden",
  },
  card: {
    padding: scale(16),
    marginBottom: scale(16),
    height: scale(85),
    width: scale(360),
    borderRadius: scale(25),
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(6),
  },

  divider: {
    height: scale(1),
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: scale(12),
  },

  text: {
    fontSize: font.size_14,
  },

  value: {
    color: "#fff",
    opacity: 0.8,
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(12),
  },

  avatar: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: "#ddd",
  },

  username: {
    color: "#e0e0e0",
    fontSize: font.size_12,
  },
  logoutText: {
    color: "#fff",
  },
});
