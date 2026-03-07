import GradientBackground from '@/src/components/GradientBackground';
import TopTabNavigator from '@/src/components/TopTabNavigator';
import { statsNavigationTabs } from '@/src/constants/constant';
import { useTheme } from '@/src/hooks/ThemeContextProvider';
import { StyleSheet } from 'react-native';
import {View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Statistics() {
  const { themePalette } = useTheme()
  return (
    <SafeAreaView style={styles.container}>
      <TopTabNavigator menuHeaders={statsNavigationTabs} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
