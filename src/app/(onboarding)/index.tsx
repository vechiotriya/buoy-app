import React, { useEffect, useRef, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import OnboardCard from "@/src/features/onboard/OnboardCard";
import { onboardingSlides } from "@/src/constants/constant";
import { CustomIcon } from "@/src/components/CustomIcon";
import { scale } from "@/src/utils/scale";
import { useTheme } from "@/src/hooks/ThemeContextProvider";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const data = [...onboardingSlides, ...onboardingSlides];

const Onboard = () => {
  const flatListRef = useRef<Animated.FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { themePalette } = useTheme();
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex + 1;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);

      // reset for infinite illusion
      if (nextIndex >= onboardingSlides.length) {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({
            index: 0,
            animated: false,
          });

          setCurrentIndex(0);
        }, 400);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEnabled={true}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <OnboardCard image={item.image} text={item.text} />
          </View>
        )}
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
          marginRight: scale(50),
          marginBottom: scale(80),
        }}
        onPress={() => {
          router.push("/(onboarding)/balance");
        }}
      >
        <CustomIcon
          name="arrow-right"
          type="Feather"
          size={scale(30)}
          color={themePalette.text}
          iconStyle={{ marginBottom: -3 }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Onboard;
