const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

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
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  donutChartColors: string[];
}

export const lightTheme: AppTheme = {
  backgroundGradient1: '#1D9CDB',
  backgroundGradient2: '#6CB3D6',
  primary: '#1E85B7',
  secondary: '#98DBEA',
  text: '#fff',
  secondaryText: '#1E85B7',
  secondaryTextLight: '#4DA8D5',
  background: '#FFFFFF',
  primaryCard: '#FFFFFF',
  positive: '#11B375',
  negative: '#FF6464',
  inputText: '#6B7280',
  inputText2: '#919BAE',
  errorText: '#5F0303',
  keypadButton: '#F1F1F1',
  shadowColor: '#000000',
  borderColor: '#FFFFFF',
  tint: tintColorLight,
  tabIconDefault: '#949494',
  tabIconSelected: tintColorLight,
  donutChartColors: [
    '#1E85B7',
    '#98DBEA',
    '#4DA8D5',
    '#6CB3D6',
    '#1D9CDB',
    '#2f95dc',
    'rgba(255, 255, 255, 1)',
    '#ffffffff',
    '#FF9B4C',
    '#FFC46B',
  ],
};

export const darkTheme: AppTheme = {
  backgroundGradient1: '#1D9CDB',
  backgroundGradient2: '#6CB3D6',
  primary: '#1E85B7',
  secondary: '#98DBEA',
  text: '#fff',
  secondaryText: '#1E85B7',
  secondaryTextLight: '#4DA8D5',
  background: '#000000',   // 👈 changed to dark background
  primaryCard: '#1E1E1E',  // 👈 darker card
  positive: '#11B375',
  negative: '#FF6464',
  inputText: '#E5E7EB',
  inputText2: '#9CA3AF',
  errorText: '#FF6B6B',
  keypadButton: '#2C2C2C',
  shadowColor: '#000000',
  borderColor: '#333333',
  tint: tintColorDark,
  tabIconDefault: '#949494',
  tabIconSelected: tintColorDark,
  donutChartColors: [
    '#1E85B7',
    '#98DBEA',
    '#4DA8D5',
    '#6CB3D6',
    '#1D9CDB',
    '#2f95dc',
    'rgba(255, 255, 255, 1)',
    '#ffffffff',
    '#FF9B4C',
    '#FFC46B',
  ],
};
