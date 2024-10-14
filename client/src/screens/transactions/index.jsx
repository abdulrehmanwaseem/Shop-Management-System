import React from "react";
import moment from "moment";
import { DataTable as Table } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { invoiceAction, paymentStatus } from "../../lib/colors";
import { currencyFormatter } from "../../lib/currencyLogic";
import { useGetTransactionLogsQuery } from "../../redux/apis/transactionLogsApi";

const Transaction = () => {
  const { data: transactionLogs } = useGetTransactionLogsQuery();

  const columns = [
    { field: "id", header: "Id" },
    {
      field: "date",
      header: "Date",
      body: ({ date }) => {
        return moment(date).format("DD/MMM/YYYY");
      },
    },
    { field: "invoice.name", header: "Name" },
    {
      field: "invoice.paymentStatus.name",
      header: "Payment Type",
      body: ({ invoice }) => {
        return (
          <Tag
            severity={paymentStatus[invoice.paymentStatus.name]}
            value={invoice.paymentStatus.name}
          />
        );
      },
    },
    {
      field: "action",
      header: "Action",
      body: (data) => {
        return (
          <Tag severity={invoiceAction[data?.action]} value={data?.action} />
        );
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
      field: "discount",
      header: "Discount",
      body: ({ discount }) => {
        return <span>{currencyFormatter.format(discount)}</span>;
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

  const noRecordFoundMsg = () => {
    return (
      <p className="dark:bg-strokedark dark:text-bodydark1 p-2 -m-2">
        No records are found.
      </p>
    );
  };

  return (
    <Table
      value={transactionLogs?.data}
      dataKey="id"
      stateStorage="session"
      stateKey="createInvoice"
      selectionMode="single"
      emptyMessage={noRecordFoundMsg()}
      showGridlines
      removableSort
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
      totalRecords={transactionLogs?.totalRecords}
    >
      {columns?.map((col, i) => (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          body={col.body}
          sortable
          filter
          filterPlaceholder="Search..."
          headerClassName="dark:bg-strokedark dark:text-bodydark1"
        />
      ))}
    </Table>
  );
};

export default Transaction;
