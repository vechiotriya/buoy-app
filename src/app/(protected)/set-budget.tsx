import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable, ScrollView, StyleSheet } from 'react-native'
import { useGetUserDetailsQuery, useUpdateProfileMutation } from '@/src/services/userApi'
import SetOverallBudget from '@/src/features/budget/SetOverallBudget'
import SetCategoryBudget from '@/src/features/budget/SetCategoryBudget'
import { scale } from '@/src/utils/scale'
import font from '@/src/constants/font'
import CustomText from '@/src/components/CustomText'
import PreferredBudgetingStyle from '@/src/features/budget/components/PreferredBudgetingStyle'

const SetBudget = () => {
  const {data}=useGetUserDetailsQuery({});
  const preferredBudgetStyle= data?.preferredBudgetStyle
  const [updateProfile,{error,isLoading}]=useUpdateProfileMutation({})
  return (
    <SafeAreaView>
      {/* <TopTabNavigator menuHeaders={setBudgetNavigationTabs} /> */}
      <ScrollView style={styles.container}>
      {!preferredBudgetStyle ? <PreferredBudgetingStyle updateProfile={updateProfile} fullName={data?.fullName}/> : 
      preferredBudgetStyle=="Standard"?<SetOverallBudget/>:<SetCategoryBudget/>
      }
      {preferredBudgetStyle &&(
        <Pressable
        disabled={isLoading}
        style={{marginBottom:preferredBudgetStyle=="Standard"?scale(290):scale(190),alignSelf:'center'}}
        onPress={() => {
          updateProfile({
            prefBudgetStyle: preferredBudgetStyle=="Standard"?"Category":"Standard",
            fullName: data?.fullName
          })
        }}>
          <CustomText size={font.size_14} style={{textAlign:'center',textDecorationLine:'underline'}}>Switch budgeting style</CustomText>
        </Pressable>
      )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    gap:scale(20),
  },
});

export default SetBudget