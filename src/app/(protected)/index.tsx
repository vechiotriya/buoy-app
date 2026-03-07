import { ScrollView, View } from "react-native";
import ProfileSection from "@/src/features/home/components/ProfileSection";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardCard from "@/src/features/home/components/DashboardCard";
import MenuTab from "@/src/features/home/components/MenuTab";
import SpendAnalysis from "@/src/components/SpendAnalysis";
import { RecentTransactions } from "@/src/components/RecentTransactions";
import { dashboardTabs } from "@/src/constants/constant";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { scale } from "@/src/utils/scale";
import AddTransactionSheet from "@/src/features/home/components/AddTransactionSheet";

export default function Home() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ rowGap: scale(24) }}>
        <ProfileSection />
        <DashboardCard />
        <View
          style={{
            marginHorizontal: scale(30),
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {dashboardTabs.map((tab, index) => (
            <MenuTab
              key={index}
              name={tab.name}
              icon={tab.icon}
              type={tab.type}
              path={tab.path}
            />
          ))}
        </View>
        <SpendAnalysis />
        <RecentTransactions seeAll />
      </ScrollView>
      {/* <BottomSheet
        ref={bottomSheetRef}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <AddTransactionSheet
          type="income"
          closeSheet={() => {
            bottomSheetRef.current?.close();
          }}
        />
      </BottomSheet> */}
    </SafeAreaView>
  );
}
