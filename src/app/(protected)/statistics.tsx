import TopTabNavigator from '@/src/components/TopTabNavigator';
import { statsNavigationTabs } from '@/src/constants/constant';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Statistics() {
  return (
    <SafeAreaView style={styles.container}>
      <TopTabNavigator menuHeaders={statsNavigationTabs} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
  },
});
