import { CustomIcon } from "@/src/components/CustomIcon";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import nomenclature from "@/src/constants/nomenclature";
import { primaryButtonStyle } from "@/src/constants/styles";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Image, Switch, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

import { Text, View } from "react-native";

export default function Settings() {
  const { themePalette } = useTheme();
  const buttonStyle = primaryButtonStyle(themePalette);
  const route = useRouter();

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
                width: 70,
                height: 70,
              }}
              style={styles.avatar}
            ></Image>

            <View>
              <CustomText variant="bold" style={styles.name}>
                Alex Martin
              </CustomText>
              <CustomText style={styles.username}>@martin95</CustomText>
            </View>
          </View>
          <CustomIcon
            type="Ionicons"
            name="chevron-forward"
            size={20}
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
              size={18}
              color="#fff"
              iconStyle={{ marginBottom: 1 }}
            />
            <CustomText style={styles.text}>{nomenclature.PAUSE_NOTIFICATIONS}</CustomText>
          </View>

          <Switch />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <CustomIcon
              type="Ionicons"
              name="refresh-outline"
              size={18}
              color="#fff"
              iconStyle={{ marginBottom: 1 }}
            />
            <CustomText style={styles.text}>{nomenclature.RESET_PASSWORD}</CustomText>
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
              size={18}
              color="#fff"
              iconStyle={{ marginBottom: 1 }}
            />
            <CustomText style={styles.text}>{nomenclature.DARK_MODE}</CustomText>
          </View>

          <Switch />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <CustomIcon
              type="Ionicons"
              name="language-outline"
              size={18}
              color="#fff"
              iconStyle={{ marginBottom: 1 }}
            />
            <CustomText style={styles.text}>{nomenclature.LANGUAGE}</CustomText>
          </View>

          <View style={styles.rowRight}>
            <CustomText style={styles.value}>English</CustomText>
            <CustomIcon
              type="Ionicons"
              name="chevron-forward"
              size={18}
              color="#fff"
              iconStyle={{ marginBottom: 1 }}
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <CustomIcon
              type="Ionicons"
              name="logo-bitcoin"
              size={18}
              color="#fff"
              iconStyle={{ marginBottom: 1 }}
            />
            <CustomText style={styles.text}>{nomenclature.CURRENCY}</CustomText>
          </View>

          <View style={styles.rowRight}>
            <CustomText style={styles.value}>INR</CustomText>
            <CustomIcon
              type="Ionicons"
              name="chevron-forward"
              size={18}
              color="#fff"
              iconStyle={{ marginBottom: 1 }}
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
              size={18}
              color="#fff"
              iconStyle={{ marginBottom: 1 }}
            />
            <CustomText style={styles.text}>{nomenclature.VERSION}</CustomText>
          </View>

          <CustomText style={styles.value}>1.0.0</CustomText>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <CustomIcon
              type="Ionicons"
              name="information-circle-outline"
              size={18}
              color="#fff"
              iconStyle={{ marginBottom: 1 }}
            />
            <CustomText style={styles.text}>{nomenclature.ABOUT}</CustomText>
          </View>

          <CustomIcon
            type="Ionicons"
            name="chevron-forward"
            size={18}
            color="#fff"
            iconStyle={{ marginBottom: 1 }}
          />
        </View>
      </BlurView>

      {/* Logout */}
      <TouchableOpacity
        style={[buttonStyle, { flexDirection: "row", gap: 8, width: "90%" }]}
      >
        <CustomIcon
          type="Ionicons"
          name="log-out-outline"
          size={20}
          color="#fff"
          iconStyle={{ marginBottom: 2 }}
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
    marginTop: "5%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  menu: {
    borderRadius: 25,
    padding: 16,
    width: "90%",
    marginBottom: 16,
    overflow: "hidden",
  },
  card: {
    padding: 16,
    marginBottom: 16,
    height: "10%",
    width: "90%",
    borderRadius: 25,
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
    gap: 10,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: 12,
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
    gap: 12,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
  },

  name: {
    color: "#fff",
    fontSize: font.size_14,
  },

  username: {
    color: "#e0e0e0",
    fontSize: font.size_12,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
