import SignIn from "../features/auth/SignIn";
import SignUp from "../features/auth/SignUp";
import { NavigationTabs } from "../types/TabNavigatorTypes";

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
export const spendAnalysisOptions:Array<string> = ['This Week', 'Last Week'];

export const loginNavigationTabs:NavigationTabs=[
    {
        tabHeading:'Login',
        component:SignIn
    },
    {
        tabHeading:'Sign Up',
        component:SignUp
    },
]

export type TransactionType={
    id: number;
    title: string;
    amount: number;
    category: string;
    iconName: string;
    type: 'Income' | 'Expense';
}
