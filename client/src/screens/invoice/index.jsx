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

const Invoice = () => {
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
    { field: "party", header: "Name" },
    { field: "particular", header: "Particular" },
    {
      field: "invoiceType",
      header: "Invoice Type",
      body: (data) => {
        return (
          <Tag
            severity={invoiceType[data.invoiceType]}
            value={data.invoiceType}
          />
        );
      },
    },
    {
      field: "paymentStatus",
      header: "Payment Status",
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
      field: "amount",
      header: "Amount",
      body: ({ amount }) => {
        return <span>{currencyFormatter.format(amount)}</span>;
      },
    },
    {
      field: "finalAmount",
      header: "Final Amount",
      body: ({ finalAmount }) => {
        return <span>{currencyFormatter.format(finalAmount)}</span>;
      },
    },
    {
      field: "revenue",
      header: "Revenue",
      body: ({ revenue }) => {
        return <span>{currencyFormatter.format(revenue)}</span>;
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
    // {
    //   field: "freight",
    //   header: "Freight",
    //   body: ({ freight }) => {
    //     return <span>{currencyFormatter.format(freight)}</span>;
    //   },
    // },
    {
      field: "remainingAmount",
      header: "Remaining Amount",
      body: ({ remainingAmount }) => {
        return <span>{currencyFormatter.format(remainingAmount)}</span>;
      },
    },
  ];

  const customActions = (data) => {
    const { paymentStatus, isCancelled } = data;
    const op = useRef(null);
    return (
      <>
        <OverlayPanel ref={op}>
          <span className="flex gap-2 actions -m-2">
            {paymentStatus !== "Paid" && !isCancelled && (
              <Edit
                strokeWidth={2.5}
                className="cursor-pointer hover:text-slate-400"
                onClick={() =>
                  dispatch(
                    openModal({
                      modalType: "updateInvoice",
                      title: "Update Invoice",
                      callback: updateInvoice,
                      data: data,
                    })
                  )
                }
              />
            )}
            <Eye
              strokeWidth={2.5}
              className="cursor-pointer hover:text-slate-400"
              onClick={() =>
                dispatch(
                  openModal({
                    modalType: "previewInvoice",
                    title: "Preview Invoice",
                    data: data,
                  })
                )
              }
            />
            {!isCancelled && (
              <X
                strokeWidth={2.5}
                className="cursor-pointer hover:text-slate-400"
                onClick={() =>
                  dispatch(
                    openModal({
                      modalType: "cancelInvoice",
                      title: "Cancel Invoice",
                      callback: cancelInvoice,
                      data: data,
                    })
                  )
                }
              />
            )}
          </span>
        </OverlayPanel>
        <button
          onClick={(event) => op.current.toggle(event)}
          aria-controls="popup_menu_left"
          aria-haspopup
        >
          <MoreHorizontal />
        </button>
      </>
    );
  };

  const noRecordFoundMsg = () => {
    return (
      <p className="dark:bg-strokedark dark:text-bodydark1 p-2 -m-2">
        No records are found.
      </p>
    );
  };

  console.log(invoices?.data);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <Link to={"/invoices/create"}>
          <Button label="Add Record" size="small" icon={<Plus />} />
        </Link>
      </Card>
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
        <Column
          body={customActions}
          header="Actions"
          headerClassName="dark:bg-strokedark dark:text-bodydark1"
        />
      </Table>
    </div>
  );
};

export default Invoice;
