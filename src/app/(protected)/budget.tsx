import GradientBackground from '@/src/components/GradientBackground';
import { useTheme } from '@/src/hooks/ThemeContextProvider';
import { StyleSheet } from 'react-native';
import {View } from 'react-native';

export default function Budget() {
  const { themePalette } = useTheme()

  return (
    <View style={styles.container}>
      <GradientBackground appTheme={themePalette} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
