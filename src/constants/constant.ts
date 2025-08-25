import SignIn from "../features/auth/SignIn";
import SignUp from "../features/auth/SignUp";
import { NavigationTabs } from "../types/TabNavigatorTypes";

export const mascotImage = require('@/assets/images/mascot.png');
export const dashboardTabs = [
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
export const spendAnalysisOptions: Array<string> = ['This Week', 'Last Week'];

export const loginNavigationTabs: NavigationTabs = [
    {
        tabHeading: 'Login',
        component: SignIn
    },
    {
        tabHeading: 'Sign Up',
        component: SignUp
    },
]

export type TransactionType = {
    id: number;
    title: string;
    amount: number;
    category: string;
    iconName: string;
    type: 'Income' | 'Expense';
}

export const keypadLayout = [
    ['1', '2', '3', { icon: 'backspace', color: '#FF6E6E' }],
    ['4', '5', '6', { icon: 'calendar-month', color: '#98BCFF' }],
    ['7', '8', '9',{ icon: 'trash-can', color: '#FFD107' }],
    [ '.','0', { icon: 'check', color: '#4393BA' }],
];