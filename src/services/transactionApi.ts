import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { storage } from "./storage";
import { FilterQueryParams } from "../features/transactions/types";

export const transactionApi = createApi({
  reducerPath: "transaction",
  tagTypes: ["Transactions"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL + "/transactions",
    prepareHeaders: (headers) => {
      const token = storage.getString("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Transactions"],
    }),
    addTransaction: builder.mutation({
      query: (transaction) => ({
        url: "/add",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["Transactions"],
    }),
    getMonthTotalStatistics: builder.query({
      query: (date: string) => ({
        url: `/month/${date}/total`,
        method: "GET",
      }),
      providesTags: ["Transactions"],
    }),
    getGroupedTransactionsByMonth: builder.query({
      query: ({ type, category, amount, date }: FilterQueryParams) => {
        let params= new URLSearchParams()
        if(type) params.append("type", type);
        if(category) params.append("category", category);
        if(amount) params.append("amount", amount);
        if(date) params.append("date", date);
        const queryString = params.toString();
        const url = queryString ? `/grouped?${queryString}` : "/grouped";        
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Transactions"],
    }),
    getGroupedTransactionBySearch: builder.query({
      query: (searchKeyword: string) =>{
        console.log(`/search/${searchKeyword}`);
        
      return  ({
        url: `/search/${searchKeyword}`,
        method: "GET",
      })},
      providesTags: ["Transactions"],
    }),
    getStatsByWeek: builder.query<any, void>({
      query: () =>{
      return  ({
        url: `/stats/week`,
        method: "GET",
      })},
      providesTags: ["Transactions"],
    }),
    getStatsByLastWeek: builder.query<any, void>({
      query: () =>{
      return  ({
        url: `/stats/lastWeek`,
        method: "GET",
      })},
      providesTags: ["Transactions"],
    }),
    getStatsByYear: builder.query<any, void>({
      query: () =>{
      return  ({
        url: `/stats/year`,
        method: "GET",
      })},
      providesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useAddTransactionMutation,
  useGetMonthTotalStatisticsQuery,
  useGetGroupedTransactionsByMonthQuery,
  useLazyGetGroupedTransactionBySearchQuery,
  useGetStatsByWeekQuery,
  useGetStatsByLastWeekQuery,
  useGetStatsByYearQuery,
} = transactionApi;
