import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const apis = createApi({
  reducerPath: "apis",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
  }),
  keepUnusedDataFor: 0.000001,
  tagTypes: [
    "Auth",
    "Customers",
    "Vendors",
    "Items",
    "Companies",
    "Expenses",
    "Invoices",
    "Categories",
    "Fields",
    "Variants",
    "TransactionLogs",
  ],
  endpoints: () => ({}),
});
