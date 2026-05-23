import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { normalizeError } from "../utils/error";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL + "/auth",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
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
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
    googleAuth: builder.mutation({
      query: (authRequest) => ({
        url: "/google",
        method: "POST",
        body: authRequest,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useGoogleAuthMutation } =
  authApi;
