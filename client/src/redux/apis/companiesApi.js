import { apis } from "./baseApi";
import onQueryStarted from "../../utils/handleApisError";

const companiesApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: () => ({
        url: "companies",
      }),
      onQueryStarted,
      providesTags: ["Companies"],
    }),
    createCompany: builder.mutation({
      query: (data) => ({
        url: `companies`,
        method: "POST",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Companies"],
    }),
    updateCompany: builder.mutation({
      query: (data) => ({
        url: `companies/${data.id}`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Companies"],
    }),
    deleteCompany: builder.mutation({
      query: ({ id }) => ({
        url: `companies/${id}`,
        method: "DELETE",
      }),
      onQueryStarted,
      invalidatesTags: ["Companies"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companiesApi;
