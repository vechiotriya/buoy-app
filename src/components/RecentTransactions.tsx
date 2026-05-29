import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { TouchableOpacity } from 'react-native'
import { CustomIcon } from './CustomIcon'
import { BlurView } from 'expo-blur'
import { useTheme } from '../hooks/ThemeContextProvider'
import { CATEGORY_ICONS, TransactionType } from '../constants/constant'
import font from '../constants/font'
import nomenclature from '../constants/nomenclature'
import { scale } from '../utils/scale'
import { useRouter } from 'expo-router'
import { useGetAllTransactionsQuery } from '../services/transactionApi'
import { normalizeError } from '../utils/error'
import Empty from './Empty'

interface TransactionListProps {
    title?: string;
    seeAll?: boolean;
}
const TransactionItem = ({ item }: { item: TransactionType }) => {
    const { themePalette } = useTheme()
    const { purpose, category, transactionType: type, amount } = item;
    console.log(item);
    const icon = CATEGORY_ICONS.find((item) => item.name == category)??{name:'Miscellaneous',icon:'money-check-dollar',type:'FontAwesome6'};
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
                        <CustomIcon name={icon?.icon} type={icon?.type} size={scale(24)} />
                    </View>
                    <View>
                        <CustomText variant='bold'>{purpose}</CustomText>
                        <CustomText size={font.size_14}>{category??type}</CustomText>
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
    const {data,isLoading,error} = useGetAllTransactionsQuery({});    
    const route=useRouter();
    if (error) {
        console.log("API error", error);
         throw normalizeError(error as Error);
    }
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
                data={data?.slice(0, 7)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Transaction item={item} />}
                windowSize={5}
                removeClippedSubviews={true}
                getItemLayout={(data, index) => ({
                    length: 76,
                    index: index,
                    offset: 76 * index,
                })}
                style={{ paddingBottom: scale(25) }}
                ListEmptyComponent={() => {
                    return (
                        <Empty text="No transactions yet." />
                    )
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({})