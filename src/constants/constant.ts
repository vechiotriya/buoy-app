import { ViewStyle } from "react-native";
import SignIn from "../features/auth/SignIn";
import SignUp from "../features/auth/SignUp";
import {
  DashboardTabTypes,
  KeypadIconButton,
  KeypadItem,
} from "../features/home/types/types";
import YearlyStats from "../features/statistics/YearlyStats";
import { NavigationTabs } from "../types/TabNavigatorTypes";

export const mascotImage = require("@/assets/images/mascot.png");
export const dashboardTabs: Array<DashboardTabTypes> = [
  {
    name: "Scan",
    icon: "qr-code-scanner",
    type: "MaterialIcons",
    path: "/(protected)/scan",
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
    component: SignIn,
  },
  {
    tabHeading: "Yearly",
    component: YearlyStats,
  },
];

export type TransactionType = {
  id: number;
  title: string;
  amount: number;
  category: string;
  iconName: string;
  type: "Income" | "Expense";
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
