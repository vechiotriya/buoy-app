import { storage } from "@/src/services/storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { normalizeError } from "../utils/error";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL + "/",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "/user-info",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    uploadProfilePicture: builder.mutation({
      query: (formData) => ({
        url: "/profile/picture",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    deleteProfilePicture: builder.mutation({
      query: () => ({
        url: "/profile/picture",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/profile",
        method: "POST",
        body: profileData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useUploadProfilePictureMutation,
  useDeleteProfilePictureMutation,
  useUpdateProfileMutation,
} = userApi;
