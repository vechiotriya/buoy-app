export const mascotImage = require('@/assets/images/mascot.png');
export const dashboardTabs= [
    {
        name: 'Scan',
        icon: 'qr-code-scanner',
        type: 'MaterialIcons',
    },
    {
        name: 'Receipt',
        icon: 'receipt',
        type: 'MaterialCommunityIcons',
    },
    {
        name: 'Transfer',
        icon: 'money',
        type: 'FontAwesome',
    }
]
export const spendAnalysisOptions = ['This Week', 'Last Week'];
export type TransactionType={
    id: number;
    title: string;
    amount: number;
    category: string;
    iconName: string;
    type: 'Income' | 'Expense';
}