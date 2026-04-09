import { storage } from "@/src/services/storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.209.252:8080/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = storage.getString("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    responseHandler: async (response) => {
      const data = await response.json();
      return data;
    },
  }),
  endpoints: (builder) => ({
    getUserDetails:builder.query({
      query: () => ({
        url: "/user-info",
        method: "GET",
      }),
    })
  }),
});

export const { useGetUserDetailsQuery } = userApi;