import { ScrollView, StyleSheet, View } from 'react-native';
import GradientBackground from '@/src/components/GradientBackground';
import ProfileSection from '@/src/features/home/components/ProfileSection';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardCard from '@/src/features/home/components/DashboardCard';
import MenuTab from '@/src/features/home/components/MenuTab';
import { dashboardTabs } from '@/constants/constant';
import SpendAnalysis from '@/src/components/SpendAnalysis';
import { RecentTransactions } from '@/src/components/RecentTransactions';

export default function Home() {
  return (
    <View style={styles.container}>
      <GradientBackground/>
      <SafeAreaView>
      <ScrollView contentContainerStyle={{ rowGap: 24}}>
      <ProfileSection/>
      <DashboardCard/>
      <View style={{ marginHorizontal: '6%',flexDirection: 'row', justifyContent: 'space-around'}}>
        {dashboardTabs.map((tab, index) => (
          <MenuTab key={index} name={tab.name} icon={tab.icon} type={tab.type} />
        ))}
      </View>
      <SpendAnalysis/>
      <RecentTransactions seeAll/>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
