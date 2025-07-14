import GradientBackground from '@/src/components/GradientBackground';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

export default function Statistics() {
  return (
    <View style={styles.container}>
      <GradientBackground />
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
