import React from 'react'
import TopTabNavigator from '@/src/components/TopTabNavigator'
import { setBudgetNavigationTabs } from '@/src/constants/constant'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'

const SetBudget = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopTabNavigator menuHeaders={setBudgetNavigationTabs} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
  },
});

export default SetBudget