import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { storage } from "./storage";
import { normalizeError } from "../utils/error";

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
    responseHandler: async (response) => {
      const data = await response.json();
       if (!response.ok) {
        throw new Error(response.statusText,{cause: {status: response.status,message: data.message || "Server error"}});
      }
      return data;
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
    }),
  }),
});

export const { useGetBudgetQuery, useAddBudgetMutation } = budgetApi;
