import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { storage } from "./storage";

export const budgetApi = createApi({
  reducerPath: "budget",
  tagTypes: ["Budget"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL + "/budget",
    prepareHeaders: (headers) => {
      const token = storage.getString("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
    endpoints: (builder) => ({
    getBudget: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags: ["Budget"],
    }),
    addBudget: builder.mutation({
        query: (budget) => ({
          url: "/add",
          method: "POST",
          body: budget,
        }),
        invalidatesTags: ["Budget"],
    })
  })  
});

export const { useGetBudgetQuery, useAddBudgetMutation } = budgetApi;