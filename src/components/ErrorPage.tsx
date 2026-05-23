import React from "react";
import { useTheme } from "../hooks/ThemeContextProvider";
import { primaryButtonStyle } from "../constants/styles";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import { errorImage } from "../constants/constant";
import font from "../constants/font";

const ErrorPage = ({retry,message}) => {
  const { themePalette } = useTheme();
  const buttonStyle = primaryButtonStyle(themePalette);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={errorImage}
        style={{ width: 200, height: 200, alignSelf: "center" }}
      />
      <CustomText variant="bold" size={font.size_18} style={{ textAlign: "center", marginTop: 16,color:themePalette.primary }}>
        Oops! Something went wrong.
      </CustomText>
      <CustomText size={font.size_14} style={{color:themePalette.secondaryTextLight }}>
        {message}
      </CustomText>
      <TouchableOpacity
        style={buttonStyle}
        onPress={retry}
      >
        <CustomText>Retry</CustomText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ErrorPage;
