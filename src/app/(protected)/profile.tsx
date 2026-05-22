import {
  Image,
  StyleSheet,
  TouchableHighlight,
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
import {
  useDeleteProfilePictureMutation,
  useGetUserDetailsQuery,
  useUpdateProfileMutation,
} from "@/src/services/userApi";
import { useImageUpload } from "@/src/hooks/useImageUpload";
import PrimaryInput from "@/src/components/PrimaryInput";

const Profile = () => {
  const { themePalette } = useTheme();
  const buttonStyle = primaryButtonStyle(themePalette);
  const { data, isLoading, refetch } = useGetUserDetailsQuery({});

  const { pickImage, uploadProfile, takePhoto,uploading } = useImageUpload();
  const [showMenu, setShowMenu] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [fullName, setFullName] = React.useState(data?.fullName || "");
  const [deleteProfilePicture, { isLoading: isDeleting }] =
    useDeleteProfilePictureMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const addPicture = ["Pick from gallery", "Take Photo"];
  return (
    <View style={styles.container}>
      {showMenu && (
        <View
          style={{
            position: "absolute",
            left: scale(120),
            top: scale(190),
            borderRadius: scale(12),
            backgroundColor: "white",
            width: scale(150),
            zIndex: 999,
            elevation: 999,
          }}
        >
          {addPicture.map((item, index) => (
            <TouchableHighlight
              underlayColor={themePalette.inputText}
              key={index}
              style={{
                padding: scale(8),
                borderBottomWidth: index === addPicture.length - 1 ? 0 : 1,
                borderBottomColor: themePalette.borderSecondary,
                borderRadius: scale(12),
              }}
              onPress={async () => {
                setShowMenu(false);
                let imageUri
                if (item === "Pick from gallery") {
                  imageUri = await pickImage();
                } else if (item === "Take Photo") {
                  imageUri = await takePhoto();
                }
                if (imageUri) {
                  uploadProfile(imageUri);
                }
              }}
            >
              <CustomText color={themePalette.inputText2} size={font.size_14}>
                {item}
              </CustomText>
            </TouchableHighlight>
          ))}
        </View>
      )}
      <TouchableOpacity
        style={styles.profileImageContainer}
        onPress={() => {
          if (data?.profile) {
            deleteProfilePicture({});
            return;
          }
          setShowMenu((prev) => !prev);
        }}
      >
        {data?.profile ? (
          <Image
            source={{
              uri: data?.profile,
              width: scale(130),
              height: scale(130),
            }}
            style={styles.profileImage}
          />
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderRadius: scale(70),
              height: scale(140),
              aspectRatio: 1,
              padding: scale(10),
              borderColor: themePalette.borderSecondary,
            }}
          >
            <CustomIcon
              name="image"
              type="Ionicons"
              size={scale(90)}
              color={themePalette.borderSecondary}
            />
          </View>
        )}
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
          {data?.profile ? (
            <CustomIcon
              name={"delete-outline"}
              type="MaterialIcons"
              size={25}
              color="#1E85B7"
            />
          ) : (
            <CustomIcon
              name={"camera-outline"}
              type="Ionicons"
              size={25}
              color="#1E85B7"
            />
          )}
        </View>
      </TouchableOpacity>
      <BlurView intensity={30} tint="light" style={styles.menu}>
        <View style={styles.row}>
          <CustomText size={font.size_14}>{nomenclature.FULLNAME}</CustomText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!edit ? (
              <CustomText size={font.size_14}>{fullName}</CustomText>
            ) : (
              <PrimaryInput
                value={fullName}
                style={{width:scale(150),height:scale(35),marginBottom:0,marginTop:scale(15)} }
                onChangeText={(text) => {
                  setFullName(text);
                }}
              />
            )}
            <TouchableOpacity
              onPress={() => setEdit((prev) => !prev)}
              style={{ marginLeft: scale(8) }}
            >
            {!edit ?  <CustomIcon
                name="pencil"
                type="Entypo"
                size={scale(20)}
                color="#fff"
                iconStyle={{ marginLeft: scale(8), marginBottom: scale(6) }}
              />:
              <CustomIcon
                name="check"
                type="Feather"
                size={scale(20)}
                color="#fff"
                iconStyle={{ marginLeft: scale(8), marginBottom: scale(6) }}
              />
              }
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
        disabled={data?.fullName === fullName || isLoading||isUpdating}
        onPress={() => {
          updateProfile({ fullName }).then(() => {
            setEdit(false);
            console.log("upp");
            
          }).catch((err)=>{
            console.log(err);
          });
        }}
        style={[buttonStyle, { marginTop: scale(100), width: scale(360) }]}
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
