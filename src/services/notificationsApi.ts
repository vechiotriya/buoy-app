import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { storage } from "./storage";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
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
    sendFcmToken: builder.mutation({
      query: (fcmToken) => ({
        url: "/fcm-token",
        method: "PUT",
        body: fcmToken,
      }),
    }),
  }),
});

export const { useSendFcmTokenMutation } = notificationsApi;