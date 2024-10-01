import { apis } from "./baseApi";
import onQueryStarted from "../../utils/handleApisError";

const customersApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => ({
        url: "customers",
      }),
      onQueryStarted,
      providesTags: ["Customers"],
    }),
    createCustomer: builder.mutation({
      query: (data) => ({
        url: `customers`,
        method: "POST",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Customers"],
    }),
    updateCustomer: builder.mutation({
      query: (data) => ({
        url: `customers/${data.id}`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Customers"],
    }),
    deleteCustomer: builder.mutation({
      query: ({ id }) => ({
        url: `customers/${id}`,
        method: "DELETE",
      }),
      onQueryStarted,
      invalidatesTags: ["Customers"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCustomersQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customersApi;
