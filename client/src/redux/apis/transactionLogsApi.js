import { apis } from "./baseApi";
import onQueryStarted from "../../utils/handleApisError";

const transactionLogsApi = apis.injectEndpoints({
  endpoints: (builder) => ({
    getTransactionLogs: builder.query({
      query: () => ({
        url: "transactionLogs",
      }),
      onQueryStarted,
      providesTags: ["TransactionLogs"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetTransactionLogsQuery } = transactionLogsApi;
