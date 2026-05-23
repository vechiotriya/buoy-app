import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { storage } from "./storage";
import { normalizeError } from "../utils/error";

export const categoryApi = createApi({
  reducerPath: "category",
  tagTypes: ["Categories"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL + "/categories",
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
    addCategory: builder.mutation({
      query: (category) => ({
        url: "/add",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    getCategoriesExpenses: builder.query({
      query: () => ({
        url: "/transactions",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoriesExpensesQuery,
} = categoryApi;
