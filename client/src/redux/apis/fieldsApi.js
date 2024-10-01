import { apis } from "./baseApi";
import onQueryStarted from "../../utils/handleApisError";

const fieldsApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getFields: builder.query({
      query: () => ({
        url: "fields",
      }),
      onQueryStarted,
      providesTags: ["Fields"],
    }),
    createField: builder.mutation({
      query: (data) => ({
        url: `fields`,
        method: "POST",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Fields"],
    }),
    updateField: builder.mutation({
      query: (data) => ({
        url: `fields/${data.id}`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Fields"],
    }),
    deleteField: builder.mutation({
      query: ({ id }) => ({
        url: `fields/${id}`,
        method: "DELETE",
      }),
      onQueryStarted,
      invalidatesTags: ["Fields"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetFieldsQuery,
  useCreateFieldMutation,
  useUpdateFieldMutation,
  useDeleteFieldMutation,
} = fieldsApi;
