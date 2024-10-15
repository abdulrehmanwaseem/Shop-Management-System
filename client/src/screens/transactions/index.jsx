import React from "react";
import moment from "moment";
import { DataTable as Table } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { paymentStatus } from "../../lib/colors";
import { currencyFormatter } from "../../lib/currencyLogic";
import {
  useGetTransactionLogsQuery,
  useLazyGetTransactionLogsByFilterQuery,
} from "../../redux/apis/transactionLogsApi";
import Card from "../../components/Card";
import { Input, Select } from "../../components/FormElements";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import {
  useGetInvoiceConfigQuery,
  useGetInvoicesTypeQuery,
} from "../../redux/apis/invoicesApi";

const columns = [
  { field: "invoiceId", header: "Invoice ID" },
  {
    field: "date",
    header: "Date",
    body: ({ date }) => {
      return moment(date).format("DD/MMM/YYYY");
    },
  },
  { field: "invoice.name", header: "Name" },
  {
    field: "paymentType",
    header: "Payment Type",
    body: ({ paymentType }) => {
      return <Tag severity={paymentStatus[paymentType]} value={paymentType} />;
    },
  },
  {
    field: "amountPaid",
    header: "Amount Paid",
    body: ({ amountPaid }) => {
      return <span>{currencyFormatter.format(amountPaid)}</span>;
    },
  },

  {
    field: "remainingAmount",
    header: "Remaining Amount",
    body: ({ remainingAmount }) => {
      return <span>{currencyFormatter.format(remainingAmount)}</span>;
    },
  },
];

const Transaction = () => {
  const methods = useForm();

  const invoiceType = methods.watch("invoiceTypeId");

  const { data: transactionLogsData } = useGetTransactionLogsQuery(
    {},
    { skip: invoiceType }
  );

  const [getTransactionLogs, { data }] =
    useLazyGetTransactionLogsByFilterQuery();

  const { data: invoiceTypeData } = useGetInvoicesTypeQuery();
  const { data: partyNamesData } = useGetInvoiceConfigQuery(
    {
      invoiceType,
    },
    { skip: !invoiceType }
  );

  const onSubmit = (formData) => {
    delete formData.invoiceTypeId;
    getTransactionLogs(formData);
  };

  const noRecordFoundMsg = () => {
    return (
      <p className="dark:bg-strokedark dark:text-bodydark1 p-2 -m-2">
        No records are found.
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex justify-between gap-6 items-center"
          >
            <div className="flex w-full gap-6">
              <Input
                label={"Search By Invoice ID"}
                name="invoiceId"
                type="number"
                placeholder="Enter Invoice ID"
              />
              <Select
                label={"Invoice Type"}
                name="invoiceTypeId"
                placeholder="Enter invoice name"
                options={invoiceTypeData?.data}
                filter={false}
              />
              <Select
                label={"Search By Party Name"}
                name="name"
                value="name"
                isDisable={!invoiceType}
                placeholder="Select party name"
                options={partyNamesData?.data}
              />
            </div>
            <div className="h-4">
              <Button
                label="Filter"
                raised
                className="py-3 px-8"
                size="small"
              />
            </div>
          </form>
        </FormProvider>
      </Card>
      <Table
        value={data?.data || transactionLogsData?.data}
        emptyMessage={noRecordFoundMsg()}
        showGridlines
        resizableColumns
        size="small"
        stripedRows
        paginator
        rows={30}
        rowsPerPageOptions={[15, 25, 30]}
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  CurrentPageReport"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="dark:bg-boxdark dark:text-slate-300"
        paginatorClassName="custom-paginator"
        totalRecords={data?.totalRecords}
      >
        {columns?.map((col, i) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            body={col.body}
            headerClassName="dark:bg-strokedark dark:text-bodydark1"
          />
        ))}
      </Table>
    </div>
  );
};

export default Transaction;
