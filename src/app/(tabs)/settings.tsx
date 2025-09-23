import GradientBackground from '@/src/components/GradientBackground';
import { useTheme } from '@/src/hooks/ThemeContextProvider';
import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native';

export default function Settings() {
  const { themePalette } = useTheme()
  return (
    <View style={styles.container}>
      <GradientBackground appTheme={themePalette}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
