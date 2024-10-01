import { apis } from "./baseApi";
import onQueryStarted from "../../utils/handleApisError";

const dashboardApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.mutation({
      query: (data) => ({
        url: "dashboard",
        method: "POST",
        body: data,
      }),
      onQueryStarted,
    }),
    getDashboardTablesData: builder.mutation({
      query: (data) => ({
        url: "dashboard/tables",
        method: "POST",
        body: data,
      }),
      onQueryStarted,
    }),
  }),
  overrideExisting: false,
});

export const { useGetDashboardMutation, useGetDashboardTablesDataMutation } =
  dashboardApi;
