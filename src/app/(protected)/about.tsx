import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "@/src/components/CustomText";
import font from "@/src/constants/font";
import { scale } from "@/src/utils/scale";
import { aboutImage } from "@/src/constants/constant";

const About = () => {
  return (
    <ScrollView
      contentContainerStyle={{

        marginTop: scale(20),
      }}
    >
      <CustomText style={{textAlign:"center"}} size={font.size_32} variant="bold">
        About Buoy
      </CustomText>
      <Image source={aboutImage} style={{ width:'100%', height: scale(300), marginVertical: scale(20) }} /> 
      <CustomText style={{textAlign:"center"}} size={font.size_18} variant="bold">
        "Buoy keeps your spending anchored so life's currents never pull you
        under.⚓"
      </CustomText>
      <CustomText
        size={font.size_18}
        style={{ marginTop: 10, textAlign: "center" }}
      >
        Most budgeting apps are built for spreadsheet enthusiasts.
        Buoy was built for everyone else, people who want to know where their
        money is going without a finance degree. We believe financial clarity🔎
        shouldn't require effort. You drop a pin, and we chart the course🏎️.
        Simple, honest, and always in your pocket💙.
      </CustomText>
    <CustomText
        size={font.size_18}
        variant="bold"
        style={{ marginTop: 10, textAlign: "center" }}
      >Developer Contact
      </CustomText>
      <CustomText
        size={font.size_14}
        style={{ marginTop: 10, textAlign: "center", }}
      >Email: vechiotriya@gmail.com</CustomText>
          <CustomText
        size={font.size_18}
        style={{ marginTop: 10, textAlign: "center",marginBottom: scale(190)}}
      >-----------Made with Expo🖤-------------</CustomText>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({});
