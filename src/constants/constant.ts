import SignIn from "../features/auth/SignIn";
import SignUp from "../features/auth/SignUp";
import {
  DashboardTabTypes,
  KeypadIconButton,
  KeypadItem,
} from "../features/home/types/types";
import YearlyStats from "../features/statistics/YearlyStats";
import { NavigationTabs } from "../types/TabNavigatorTypes";
import WeeklyStats from "../features/statistics/WeeklyStats";
import SetCategoryBudget from "../features/budget/SetCategoryBudget";
import SetOverallBudget from "../features/budget/SetOverallBudget";
import { CustomIcon } from "@/src/components/CustomIcon";
import { CategoryIcon } from "../types/misc";

export const mascot2Image = require("@/assets/images/mascot2.png");
export const errorImage= require("@/assets/images/error-image.png");
export const coinInHand= require("@/assets/images/coin-in-hand.png");
export const bankLocker= require("@/assets/images/bank-locker.png");
export const growthGraph= require("@/assets/images/growth-graph.png");
export const aboutImage= require("@/assets/images/buoy.jpg");
export const empty= require("@/assets/images/empty.png");
export const loader= require("@/assets/lottie/ocean.json");

export const dashboardTabs: Array<DashboardTabTypes> = [
  {
    name: "Statistics",
    icon: "graph",
    type: "SimpleLineIcons",
    path: "/(protected)/statistics",
  },
  {
    name: "Receipt",
    icon: "receipt",
    type: "MaterialIcons",
    path: "/(protected)/receipt",
  },
  {
    name: "Budget",
    icon: "piggy-bank",
    type: "FontAwesome6",
    path: "/(protected)/budget",
  },
];
export const spendAnalysisOptions: Array<string> = ["This Week", "Last Week"];

export const loginNavigationTabs: NavigationTabs = [
  {
    tabHeading: "Login",
    component: SignIn,
  },
  {
    tabHeading: "Sign Up",
    component: SignUp,
  },
];
export const statsNavigationTabs: NavigationTabs = [
  {
    tabHeading: "Weekly",
    component: WeeklyStats,
  },
  {
    tabHeading: "Yearly",
    component: YearlyStats,
  },
];
export const setBudgetNavigationTabs: NavigationTabs = [
  {
    tabHeading: "Category",
    component: SetCategoryBudget,
  },
  {
    tabHeading: "Overall",
    component: SetOverallBudget,
  },
];

export type TransactionType = {
  id: number;
  purpose: string;
  amount: number;
  category: string;
  transactionType: "Income" | "Expense";
};

export const keypadLayout: KeypadItem[][] = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [{ icon: "trash-can", color: "#FFD107" }, ".", "0"],
];

export const sideButtons: KeypadIconButton[] = [
  { icon: "backspace", color: "#FF6E6E" },
  { icon: "calendar-month", color: "#98BCFF" },
  { icon: "check", color: "#4393BA" },
];

export const quickInputs: number[] = [500, 1000, 5000];

export const defaultCategories = [
  "Housing",
  "Utilities & Bills",
  "Groceries",
  "Transportation",
  "Health & Insurance",
  "Entertainment",
  "Savings",
  "Debt",
  "Miscellaneous",
];

export const onboardingSlides= [
  {
    image: coinInHand,
    text: "Set a budget for each category and track your spending habits.",
  },
  {
    image: growthGraph,
    text: "Stay on top of your finances with real-time updates and insights.",
  },
  {
    image: bankLocker,
    text: "Get started now and take control of your financial future!",
  }
]

export const CATEGORY_ICONS:CategoryIcon[]=[
  {name:'Entertainment',icon:'drama-masks',type:'MaterialCommunityIcons'},
  {name:'Savings',icon:'piggy-bank',type:'FontAwesome6'},
  {name:'Groceries',icon:'shopping-cart',type:'Feather'},
  {name:'Utilities',icon:'receipt',type:'Ionicons'},
  {name:'Transportation',icon:'emoji-transportation',type:'MaterialIcons'},
  {name:'Debt',icon:'credit-card',type:'Entypo'},
  {name:'Housing',icon:'house-chimney-window',type:'FontAwesome6'},
  {name:'Miscellaneous',icon:'money-check-dollar',type:'FontAwesome6'},
  {name:'Health',icon:'pill',type:'MaterialCommunityIcons'},
]