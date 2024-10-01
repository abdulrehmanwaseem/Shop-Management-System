import { apis } from "./baseApi";
import onQueryStarted from "../../utils/handleApisError";

const vendorsApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.query({
      query: () => ({
        url: "vendors",
      }),
      onQueryStarted,
      providesTags: ["Vendors"],
    }),
    createVendor: builder.mutation({
      query: (data) => ({
        url: `vendors`,
        method: "POST",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Vendors"],
    }),
    updateVendor: builder.mutation({
      query: (data) => ({
        url: `vendors/${data.id}`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Vendors"],
    }),
    deleteVendor: builder.mutation({
      query: ({ id }) => ({
        url: `vendors/${id}`,
        method: "DELETE",
      }),
      onQueryStarted,
      invalidatesTags: ["Vendors"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetVendorsQuery,
  useCreateVendorMutation,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
} = vendorsApi;
