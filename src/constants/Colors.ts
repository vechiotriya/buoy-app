const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export interface AppTheme {
  backgroundGradient1: string;
  backgroundGradient2: string;
  primary: string;
  secondary: string;
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
  secondary: "#98DBEA",
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
    "#4DA8D5",
    "#6CB3D6",
    "#1D9CDB",
    "#2f95dc",
    "rgba(255, 255, 255, 1)",
    "#ffffffff",
    "#FF9B4C",
    "#FFC46B",
  ],
  categoryColors:['#E57373', '#64B5F6', '#81C784', '#FFD54F',
  '#BA68C8', '#4DB6AC', '#FF8A65', '#90A4AE',
  '#F06292', '#4FC3F7', '#AED581', '#FFB74D',]
};

export const darkTheme: AppTheme = {
  backgroundGradient1: "#1D9CDB",
  backgroundGradient2: "#6CB3D6",
  primary: "#1E85B7",
  secondary: "#98DBEA",
  text: "#fff",
  secondaryText: "#1E85B7",
  secondaryTextLight: "#4DA8D5",
  background: "#000000", // 👈 changed to dark background
  primaryCard: "#1E1E1E", // 👈 darker card
  positive: "#11B375",
  negative: "#FF6464",
  inputText: "#E5E7EB",
  inputText2: "#6B7280",
  errorText: "#FF6B6B",
  keypadButton: "#2C2C2C",
  shadowColor: "#000000",
  borderColor: "#333333",
  borderSecondary: "#E5E7EB",
  tint: tintColorDark,
  tabIconDefault: "#949494",
  tabIconSelected: tintColorDark,
  speedometerColor: "#177AD5",
  donutChartColors: [
    "#1E85B7",
    "#98DBEA",
    "#4DA8D5",
    "#6CB3D6",
    "#1D9CDB",
    "#2f95dc",
    "rgba(255, 255, 255, 1)",
    "#ffffffff",
    "#FF9B4C",
    "#FFC46B",
  ],
  categoryColors:['#E57373', '#64B5F6', '#81C784', '#FFD54F',
  '#BA68C8', '#4DB6AC', '#FF8A65', '#90A4AE',
  '#F06292', '#4FC3F7', '#AED581', '#FFB74D',]
};

