import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import font from '@/constants/font'
import nomenclature from '@/constants/nomenclature'
import { TouchableOpacity } from 'react-native'
import { CustomIcon } from './CustomIcon'
import { TransactionType } from '@/constants/constant'
import { BlurView } from 'expo-blur'
import { useTheme } from '../hooks/ThemeContextProvider'

interface TransactionListProps {
    title?: string;
    seeAll?: boolean;
}
const TransactionItem = ({ item }: { item: TransactionType }) => {
    const { themePalette } = useTheme()
    const { title, category, iconName, type, amount } = item;
    return (
        <BlurView intensity={30} tint="light" style={{
            height: 76,
            marginBottom: 16,
            padding: 16,
            borderRadius: 16,
            overflow: 'hidden',
            justifyContent: 'center',
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnGap: '4%' }}>
                    <View style={{ width: 41, backgroundColor: themePalette.secondary, height: 44, justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
                        <CustomIcon name={iconName} type='MaterialCommunityIcons' size={24} />
                    </View>
                    <View>
                        <CustomText variant='bold'>{title}</CustomText>
                        <CustomText size={font.size_14}>{category}</CustomText>
                    </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <CustomText variant='bold' style={{ textAlign: 'right' }}>
                        {(type == 'Income' ? '+' : '-') + " " + nomenclature.rupee_sign + ' ' + amount}
                    </CustomText>
                </View>
            </View>

        </BlurView>
    )
}
const Transaction = React.memo(TransactionItem);
export const RecentTransactions = ({title,seeAll}:TransactionListProps) => {
    const transactions = [
        { id: 1, title: 'Transaction 1', amount: '100', category: 'Food', iconName: 'food', type: 'Expense' },
        { id: 2, title: 'Transaction 2', amount: '200', category: 'Transport', iconName: 'airplane', type: 'Expense' },
        { id: 3, title: 'Transaction 3', amount: '300', category: 'Shopping', iconName: 'shopping', type: 'Expense' },
        { id: 15, title: 'Transaction 1', amount: '100', category: 'Food', iconName: 'food', type: 'Expense' },
        { id: 24, title: 'Transaction 2', amount: '200', category: 'Transport', iconName: 'airplane', type: 'Income' },
        { id: 34, title: 'Transaction 3', amount: '300', category: 'Shopping', iconName: 'shopping', type: 'Expense' },
        { id: 4, title: 'Transaction 4', amount: '400', category: 'Entertainment', iconName: 'movie', type: 'Expense' },
    ];
    return (
        <View style={{ marginHorizontal: '6%', rowGap: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <CustomText size={font.size_18} variant='bold' >
                    {title || nomenclature.recent_transactions}
                </CustomText>
            {seeAll && <TouchableOpacity onPress={() => console.log('See All Pressed')}>
                    <CustomText size={font.size_14} variant='regular'>
                        {nomenclature.see_all}
                    </CustomText>
                </TouchableOpacity>}
            </View>
            <FlatList
                
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Transaction item={item} />}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={true}
                getItemLayout={(data, index) => ({
                    length: 76,
                    index: index,
                    offset: 76 * index,
                })}
            />
        </View>
    )
}


const styles = StyleSheet.create({})