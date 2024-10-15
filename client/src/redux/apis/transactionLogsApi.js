import { apis } from "./baseApi";
import onQueryStarted from "../../utils/handleApisError";
import queryStringGenerator from "../../utils/queryStringGenerator";

const transactionLogsApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionLogs: builder.query({
      query: () => ({
        url: "transactionLogs",
      }),
      onQueryStarted,
      providesTags: ["TransactionLogs"],
    }),
    getTransactionLogsByFilter: builder.query({
      query: (filter) => ({
        url: queryStringGenerator("transactionLogs/filter", filter),
      }),
      onQueryStarted,
      providesTags: ["TransactionLogs"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTransactionLogsQuery,
  useLazyGetTransactionLogsByFilterQuery,
} = transactionLogsApi;
