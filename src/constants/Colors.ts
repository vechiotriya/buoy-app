const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export interface AppTheme {
  backgroundGradient1: string;
  backgroundGradient2: string;
  primary: string;
  primaryDisabled: string;
  secondary: string;
  menuBackground: string;
  menuButton: string;
  secondaryTextLight: string;
  text: string;
  secondaryText: string;
  background: string;
  primaryCard: string;
  positive: string;
  negative: string;
  inputText: string;
  inputText2: string;
  errorText: string;
  keypadButton: string;
  shadowColor: string;
  borderColor: string;
  borderSecondary: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  speedometerColor: string;
  donutChartColors: string[];
  categoryColors: string[];
}

export const lightTheme: AppTheme = {
  backgroundGradient1: "#1D9CDB",
  backgroundGradient2: "#6CB3D6",
  primary: "#1E85B7",
  primaryDisabled: "#9fa5a8",
  secondary: "#98DBEA",
  menuBackground:"rgba(202, 232, 248, 0.86)",
  menuButton: "rgba(255, 255, 255, 0.97)",
  text: "#fff",
  secondaryText: "#1E85B7",
  secondaryTextLight: "#4DA8D5",
  background: "#FFFFFF",
  primaryCard: "#FFFFFF",
  positive: "#11B375",
  negative: "#FF6464",
  inputText: "#6B7280",
  inputText2: "#919BAE",
  errorText: "#5F0303",
  keypadButton: "#F1F1F1",
  shadowColor: "#000000",
  borderColor: "#FFFFFF",
  borderSecondary: "#E5E7EB",
  tint: tintColorLight,
  tabIconDefault: "#949494",
  tabIconSelected: tintColorLight,
  speedometerColor: "#177AD5",
  donutChartColors: [
    "#1E85B7",
    "#98DBEA",
    "#155F85",
    "#2eceb4",
    "#64C4D8",
    "#0D4F6C",
    "#3ECFED",
    "#A8E6F0",
    "#1A9E8F",
    "#27C4A0",
    "#5BD4B0",
    "#0A7B6E",
    "#F4A942",
    "#F7C46A",
    "#E8724A",
    "#D94F6B",
    "#9B59B6",
    "#C39BD3",
    "#5D8AA8",
  ],
  categoryColors: [
    "#E57373",
    "#64B5F6",
    "#81C784",
    "#FFD54F",
    "#BA68C8",
    "#4DB6AC",
    "#FF8A65",
    "#90A4AE",
    "#F06292",
    "#4FC3F7",
    "#AED581",
    "#FFB74D",
  ],
};

export const darkTheme: AppTheme = {
  backgroundGradient1: "#0C5880",
  backgroundGradient2: "#1A6F96",
  primary: "#164658",
  primaryDisabled: "#2E3F4E",
  secondary: "#1A5F73",
  menuBackground: "rgba(33, 44, 46, 0.8)",
  menuButton: "#152839",
  text: "#E8F4FD",
  secondaryText: "#7DC8E8",
  secondaryTextLight: "#5AA8C8",
  background: "#0E1F2E",
  primaryCard: "#152839",
  positive: "#2ED88A",
  negative: "#FF7B7B",
  inputText: "#E8F4FD",
  inputText2: "#737e8f",
  errorText: "#FFB3B3",
  keypadButton: "#1C3448",
  shadowColor: "#000000",
  borderColor: "#1E3D56",
  borderSecondary: "#1C3347",
  tint: tintColorDark,
  tabIconDefault: "#4A6A85",
  tabIconSelected: tintColorDark,
  speedometerColor: "#3BB5E0",
  donutChartColors: [
    "#3CAADC",
    "#6ECFE6",
    "#2A8FBF",
    "#35E5C8",
    "#7DD4E6",
    "#1A7AA8",
    "#55D8F2",
    "#A0E8F5",
    "#22C4B0",
    "#2EE0B8",
    "#6AEABF",
    "#0EA898",
    "#F7BC55",
    "#F9D07E",
    "#EF8A65",
    "#E86B83",
    "#B07CC8",
    "#D0B0E0",
    "#7AAAC8",
  ],
  categoryColors: [
    "#EF8F8F",
    "#7EC5F8",
    "#95D598",
    "#FFDF70",
    "#CC88DA",
    "#62C9BE",
    "#FFA080",
    "#A8BCC6",
    "#F47DAA",
    "#6DCFF8",
    "#C0E099",
    "#FFC870",
  ],
};
