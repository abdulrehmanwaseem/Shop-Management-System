import { apis } from "./baseApi";
import onQueryStarted from "../../utils/handleApisError";

const variantsApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getVariants: builder.query({
      query: () => ({
        url: "variants",
      }),
      onQueryStarted,
      providesTags: ["Variants"],
    }),
    createVariant: builder.mutation({
      query: (data) => ({
        url: `variants`,
        method: "POST",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Variants"],
    }),
    updateVariant: builder.mutation({
      query: (data) => ({
        url: `variants/${data.id}`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Variants"],
    }),
    deleteVariant: builder.mutation({
      query: ({ id }) => ({
        url: `variants/${id}`,
        method: "DELETE",
      }),
      onQueryStarted,
      invalidatesTags: ["Variants"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetVariantsQuery,
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
} = variantsApi;
