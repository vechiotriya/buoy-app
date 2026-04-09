import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.209.252:8080/auth",
    prepareHeaders:(headers)=>{
        headers.set('Content-Type', 'application/json');
        return headers;
    },
    responseHandler: async (response) => {
      const data = await response.json()
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
  }),
});
