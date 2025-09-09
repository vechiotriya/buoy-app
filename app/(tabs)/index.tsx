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
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import CustomText from '@/src/components/CustomText';
import AddTransactionSheet from '@/src/features/home/components/AddTransactionSheet';

export default function Home() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <View style={styles.container}>
      <GradientBackground />
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
