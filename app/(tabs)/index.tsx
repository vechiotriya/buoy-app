import { StyleSheet, View } from 'react-native';
import GradientBackground from '@/src/components/GradientBackground';
import ProfileSection from '@/src/features/home/components/ProfileSection';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardCard from '@/src/features/home/components/DashboardCard';
import MenuTab from '@/src/features/home/components/MenuTab';
import { dashboardTabs } from '@/constants/constant';

export default function Home() {
  return (
    <View style={styles.container}>
      <GradientBackground/>
      <SafeAreaView>
      <ProfileSection/>
      <DashboardCard/>
      <View style={{ marginHorizontal: '6%',flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
        {dashboardTabs.map((tab, index) => (
          <MenuTab key={index} name={tab.name} icon={tab.icon} type={tab.type} />
        ))}
      </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
