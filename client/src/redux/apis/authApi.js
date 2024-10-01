import { apis } from "./baseApi";
import onQueryStarted from "../../utils/handleApisError";

const authApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "auth/me",
      }),
      onQueryStarted,
      providesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Auth"],
    }),
    logout: builder.query({
      query: () => ({
        url: "auth/logout",
        onQueryStarted,
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useLoginMutation, useLazyLogoutQuery } =
  authApi;
