import { apis } from "./baseApi";
import onQueryStarted from "../../utils/handleApisError";

const categoriesApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "categories",
      }),
      onQueryStarted,
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: `categories`,
        method: "POST",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `categories/${data.id}`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      onQueryStarted,
      invalidatesTags: ["Categories"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
