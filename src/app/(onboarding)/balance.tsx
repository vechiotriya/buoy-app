import { View, TouchableOpacity } from "react-native";
import React, { useMemo, useState } from "react";
import PrimaryInput from "@/src/components/PrimaryInput";
import { scale } from "@/src/utils/scale";
import font from "@/src/constants/font";
import CustomText from "@/src/components/CustomText";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { CustomIcon } from "@/src/components/CustomIcon";
import { useDispatch } from "react-redux";
import {
  setInitialBalance,
  setOnboarded,
} from "@/src/store/slices/authSlice";

const SetBalance = () => {
  const { themePalette } = useTheme();
  const dispatch = useDispatch();

  const [balance, setBalance] = useState("");

  const hasError = useMemo(() => {
    return /[^0-9]/.test(balance);
  }, [balance]);

  const isDisabled = balance.length === 0 || hasError;

  const handleChange = (text: string) => {
    // Allow only digits
    const cleaned = text.replace(/[^0-9]/g, "");
    setBalance(cleaned);
  };

  const handleSubmit = () => {
    const amount = Number(balance);

    if (isNaN(amount)) return;

    dispatch(setInitialBalance(amount));
    dispatch(setOnboarded());
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: scale(20),
      }}
    >
      <CustomText
        style={{
          marginBottom: scale(20),
          textAlign: "center",
        }}
        size={font.size_24}
      >
        Let’s start by entering your current balance
      </CustomText>

      <PrimaryInput
        keyboardType="numeric"
        value={balance}
        error={hasError ? "Enter a valid number" : ""}
        onChangeText={handleChange}
        style={{
          height: scale(70),
          fontSize: font.size_24,
        }}
      />

      <TouchableOpacity
        style={{
          width: scale(70),
          aspectRatio: 1,
          alignSelf: "flex-end",
          borderRadius: scale(50),
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 2,
          borderColor: themePalette.borderColor,
          marginRight: scale(30),
          marginTop: scale(80),
          opacity: isDisabled ? 0.5 : 1,
        }}
        disabled={isDisabled}
        onPress={handleSubmit}
      >
        <CustomIcon
          name="arrow-right"
          type="Feather"
          size={scale(30)}
          color={themePalette.text}
          iconStyle={{ marginBottom: -3 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SetBalance;