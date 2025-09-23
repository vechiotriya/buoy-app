import { ScrollView, StyleSheet, View } from 'react-native';
import GradientBackground from '@/src/components/GradientBackground';
import ProfileSection from '@/src/features/home/components/ProfileSection';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardCard from '@/src/features/home/components/DashboardCard';
import MenuTab from '@/src/features/home/components/MenuTab';
import SpendAnalysis from '@/src/components/SpendAnalysis';
import { RecentTransactions } from '@/src/components/RecentTransactions';
import AddFloatingButton from '@/src/features/home/components/AddFloatingButton';
import { dashboardTabs } from '@/src/constants/constant';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { useTheme } from '@/src/hooks/ThemeContextProvider';
import AddTransactionSheet from '@/src/features/home/components/AddTransactionSheet';

export default function Home() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { themePalette } = useTheme()

  return (
    <View style={styles.container}>
      <GradientBackground appTheme={themePalette} />
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ rowGap: 24 }}>
          <ProfileSection />
          <DashboardCard />
          <View style={{ marginHorizontal: '6%', flexDirection: 'row', justifyContent: 'space-around' }}>
            {dashboardTabs.map((tab, index) => (
              <MenuTab key={index} name={tab.name} icon={tab.icon} type={tab.type} />
            ))}
          </View>
          <SpendAnalysis />
          <RecentTransactions seeAll />
        </ScrollView>
        <AddFloatingButton />
      </SafeAreaView>
      {/* <BottomSheet ref={bottomSheetRef} style={{ flex: 1, backgroundColor: 'white' }}>
            <AddTransactionSheet type='expense' closeSheet={()=>{
              bottomSheetRef.current?.close()}}/>
      </BottomSheet> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
