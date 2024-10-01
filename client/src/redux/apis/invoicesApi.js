import { apis } from "./baseApi";
import onQueryStarted from "../../utils/handleApisError";
import queryStringGenerator from "../../utils/queryStringGenerator";

const invoicesApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => ({
        url: "invoices",
      }),
      onQueryStarted,
      providesTags: ["Invoices"],
    }),
    getInvoicesType: builder.query({
      query: () => ({
        url: "invoicesType",
      }),
      onQueryStarted,
    }),
    getPaymentStatus: builder.query({
      query: () => ({
        url: "paymentStatus",
      }),
      onQueryStarted,
    }),
    getInvoiceConfig: builder.query({
      query: (invoiceType) => ({
        url: queryStringGenerator("invoices/config", invoiceType),
      }),
      onQueryStarted,
    }),
    createInvoice: builder.mutation({
      query: (data) => ({
        url: `invoices`,
        method: "POST",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Invoices", "Items"],
    }),
    cancelInvoice: builder.mutation({
      query: ({ id }) => ({
        url: `invoices/cancel/${id}`,
        method: "PUT",
      }),
      onQueryStarted,
      invalidatesTags: ["Invoices", "Items"],
    }),
    updateInvoice: builder.mutation({
      query: (data) => ({
        url: `invoices/${data.id}`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted,
      invalidatesTags: ["Invoices"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetInvoicesQuery,
  useGetInvoicesTypeQuery,
  useCreateInvoiceMutation,
  useGetInvoiceConfigQuery,
  useGetPaymentStatusQuery,
  useCancelInvoiceMutation,
  useUpdateInvoiceMutation,
} = invoicesApi;
