import { apis } from "./baseApi";
import onQueryStarted from "../../utils/handleApisError";

const itemsApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => ({
        url: "items",
      }),
      onQueryStarted,
      providesTags: ["Items"],
    }),
    createItem: builder.mutation({
      query: (data) => ({
        url: `items`,
        method: "POST",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Items"],
    }),
    updateItem: builder.mutation({
      query: (data) => ({
        url: `items/${data.id}`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Items"],
    }),
    deleteItem: builder.mutation({
      query: ({ id }) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
      onQueryStarted,
      invalidatesTags: ["Items"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemsApi;
