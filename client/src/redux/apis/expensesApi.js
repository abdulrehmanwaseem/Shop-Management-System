import { apis } from "./baseApi";
import onQueryStarted from "../../utils/handleApisError";

const expensesApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => ({
        url: "expenses",
      }),
      onQueryStarted,
      providesTags: ["Expenses"],
    }),
    createExpense: builder.mutation({
      query: (data) => ({
        url: `expenses`,
        method: "POST",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Expenses"],
    }),
    updateExpense: builder.mutation({
      query: (data) => ({
        url: `expenses/${data.id}`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Expenses"],
    }),
    deleteExpense: builder.mutation({
      query: ({ id }) => ({
        url: `expenses/${id}`,
        method: "DELETE",
      }),
      onQueryStarted,
      invalidatesTags: ["Expenses"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;
