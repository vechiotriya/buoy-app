const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const lightTheme = {
  backgroundGradient1: '#1D9CDB',
  backgroundGradient2: '#6CB3D6',
  primary:'#1E85B7',
  text: '#fff',
  secondaryText: '#1E85B7',
  background: '#fff',
  primaryCard:'#FFFFFF',
  positive: '#11B375',
  negative: '#FF6464',
  tint: tintColorLight,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColorLight,
}

export const darkTheme = {
  backgroundGradient1: '#1D9CDB',
  backgroundGradient2: '#6CB3D6',
  primary:'#1E85B7',
  text: '#fff',
  secondaryText: '#1E85B7',
  background: '#000',
  primaryCard:'#FFFFFF',
  positive: '#11B375',
  negative: '#FF6464',
  tint: tintColorDark,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColorDark,
}

export interface AppTheme {
  backgroundGradient1: string,
  backgroundGradient2: string,
  primary: string,
  text: string,
  secondaryText: string,
  background: string,
  primaryCard: string,
  positive: string,
  negative: string,
  tint: string,
  tabIconDefault: string,
  tabIconSelected: string,
};
