import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { storage } from "./storage";


export const transactionApi = createApi({
    reducerPath:'transaction',
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.EXPO_PUBLIC_BASE_URL + '/transactions',
        prepareHeaders: (headers) => {
            const token = storage.getString('accessToken');
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
          },
    },
),
endpoints:(builder) => ({
    getAllTransactions:builder.query({
        query:() => ({
            url:'/',
            method:'GET',
        }),
    }),
    addTransaction:builder.mutation({
        query:(transaction) => ({
            url:'/add',
            method:'POST',
            body:transaction,
        }),
    }),
}),
})

export const {useGetAllTransactionsQuery,useAddTransactionMutation} = transactionApi