import React, { useRef } from "react";
import moment from "moment";
import { Edit, Plus, Eye, X, MoreHorizontal } from "lucide-react";
import { DataTable as Table } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slice/modal";
import { Link } from "react-router-dom";
import {
  useCancelInvoiceMutation,
  useGetInvoicesQuery,
  useUpdateInvoiceMutation,
} from "../../redux/apis/invoicesApi";
import { OverlayPanel } from "primereact/overlaypanel";
import { invoiceType, paymentStatus } from "../../lib/colors";
import Card from "../../components/Card";
import { currencyFormatter } from "../../lib/currencyLogic";

const Transaction = () => {
  const { data: invoices } = useGetInvoicesQuery();
  const [cancelInvoice] = useCancelInvoiceMutation();
  const [updateInvoice] = useUpdateInvoiceMutation();

  const dispatch = useDispatch();

  const columns = [
    { field: "id", header: "Id" },
    {
      field: "date",
      header: "Date",
      body: ({ date }) => {
        return moment(date).format("DD/MMM/YYYY");
      },
    },
    { field: "name", header: "Name" },
    {
      field: "paymentStatus",
      header: "Action",
      body: (data) => {
        return (
          <Tag
            severity={
              paymentStatus[
                data?.isCancelled ? "Cancelled" : data.paymentStatus
              ]
            }
            value={data?.isCancelled ? "Cancelled" : data.paymentStatus}
          />
        );
      },
    },
    {
      field: "paidAmount",
      header: "Paid Amount",
      body: ({ paidAmount }) => {
        return <span>{currencyFormatter.format(paidAmount)}</span>;
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
      value={invoices?.data}
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
      rows={15}
      rowsPerPageOptions={[5, 15, 25]}
      tableStyle={{ minWidth: "50rem" }}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  CurrentPageReport"
      currentPageReportTemplate="{first} to {last} of {totalRecords}"
      rowClassName="dark:bg-boxdark dark:text-slate-300"
      paginatorClassName="custom-paginator"
      totalRecords={invoices?.totalRecords}
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
