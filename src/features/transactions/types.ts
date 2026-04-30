export type GroupedTransactionData = {
  month: string;
  year: string;
  total: number;
  transactions: any;
};

export type FilterQueryParams = {
  type?: "Expense" | "Income"|"All";
  category?:
    | "Housing"
    | "Utilities"
    | "Groceries"
    | "Transportation"
    | "Health"
    | "Entertainment"
    | "Savings"
    | "Debt"
    | "Miscellaneous"
  amount?: "Upto200" | "From200to500" | "From500to2000" | "Above2000";
  date?: "Today" | "Thisweek" | "Thismonth" | "Last3months";
};
