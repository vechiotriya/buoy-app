import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useUploadProfilePictureMutation } from "../services/userApi";

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProfilePicture, { isLoading }] =
    useUploadProfilePictureMutation();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setError("Gallery permission is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8, // slight compression to reduce payload
      shape: "oval",
    });
    console.log("result image",result);
    
    if (!result?.canceled) {
      setError("");
      return result?.assets?.[0]?.uri;
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      setError("Camera permission is required.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      shape: "oval",
      quality: 0.7,
    });

    if (!result.canceled) {
      setError("");
      return result.assets[0].uri;
    }
  };

  const uploadProfile = (imageUri: string) => {
    if (!imageUri) {
      setError("Please select an image first.");
      return;
    }
    try {
      const filename = imageUri?.split("/")?.pop();
      const extension = filename?.split(".")?.pop()?.toLowerCase();
      const mimeType = extension === "png" ? "image/png" : "image/jpeg";
      const formData = new FormData();
      formData?.append("file", {
        uri: imageUri,
        name: filename,
        type: mimeType,
      });
      uploadProfilePicture(formData).unwrap().then((response) => {
        console.log("Uploading pfp...", response.url);
        setError("");
        setUploading(false);
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image.");
      setUploading(false);
    }
  };

  return {
    uploading,
    error,
    pickImage,
    takePhoto,
    uploadProfile,
  };
}
