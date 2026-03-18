import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { TouchableOpacity } from 'react-native'
import { CustomIcon } from './CustomIcon'
import { BlurView } from 'expo-blur'
import { useTheme } from '../hooks/ThemeContextProvider'
import { TransactionType } from '../constants/constant'
import font from '../constants/font'
import nomenclature from '../constants/nomenclature'
import { scale } from '../utils/scale'
import { useRouter } from 'expo-router'

interface TransactionListProps {
    title?: string;
    seeAll?: boolean;
}
const TransactionItem = ({ item }: { item: TransactionType }) => {
    const { themePalette } = useTheme()
    const { title, category, iconName, type, amount } = item;
    return (
        <BlurView intensity={30} tint="light" style={{
            height: scale(76),
            marginBottom: scale(16),
            padding: scale(16),
            borderRadius: scale(16),
            overflow: 'hidden',
            justifyContent: 'center',
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnGap: scale(16) }}>
                    <View style={{ width: scale(41), backgroundColor: themePalette.secondary, height: scale(44), justifyContent: 'center', alignItems: 'center', borderRadius: scale(8) }}>
                        <CustomIcon name={iconName} type='MaterialCommunityIcons' size={scale(24)} />
                    </View>
                    <View>
                        <CustomText variant='bold'>{title}</CustomText>
                        <CustomText size={font.size_14}>{category}</CustomText>
                    </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <CustomText variant='bold' style={{ textAlign: 'right' }}>
                        {(type == 'Income' ? '+' : '-') + " " + nomenclature.RUPEE_SIGN + ' ' + amount}
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
    const route=useRouter();
    return (
        <View style={{ marginHorizontal: scale(24), rowGap: scale(24),paddingBottom: scale(24) }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <CustomText size={font.size_18} variant='bold' >
                    {title || nomenclature.RECENT_TRANSACTIONS}
                </CustomText>
            {seeAll && <TouchableOpacity onPress={() => route.push('/(protected)/transactions')
            }>
                    <CustomText size={font.size_14} variant='regular'>
                        {nomenclature.SEE_ALL}
                    </CustomText>
                </TouchableOpacity>}
            </View>
            <FlatList
                scrollEnabled={false}
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