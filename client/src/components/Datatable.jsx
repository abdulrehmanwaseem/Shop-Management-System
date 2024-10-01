import React from "react";
import { DataTable as Table } from "primereact/datatable";
import { Column } from "primereact/column";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import Card from "./Card";
import { openModal } from "../redux/slice/modal";

const DataTable = ({
  data = [],
  columns = [],
  createRecord = null,
  updateRecord = null,
  deleteRecord = null,
  totalRecords = 0,
  modalType,
  addBtn = true,
  rowActions = true,
  rows = 10,
}) => {
  const dispatch = useDispatch();

  const rowActionsCol = (data, row) => {
    return (
      <span className="flex items-center gap-4 actions">
        <Edit
          className="cursor-pointer hover:text-slate-400"
          onClick={() =>
            dispatch(
              openModal({
                modalType: modalType,
                title: "Update Record",
                sendId: true,
                data: data,
                callback: updateRecord,
              })
            )
          }
        />
        <Trash2
          className="cursor-pointer hover:text-slate-400"
          onClick={() =>
            dispatch(
              openModal({
                modalType: "confirmation",
                title: "Delete Record",
                data: data,
                callback: deleteRecord,
              })
            )
          }
        />
      </span>
    );
  };

  const noRecordFoundMsg = () => {
    return (
      <p className="dark:bg-boxdark dark:text-bodydark1 p-2 -m-2">
        No records are found.
      </p>
    );
  };

  return (
    <div className={addBtn ? "flex flex-col gap-6" : undefined}>
      {addBtn && (
        <Card>
          <Button
            label="Add Record"
            size="small"
            icon={<Plus />}
            onClick={() =>
              dispatch(
                openModal({
                  modalType: modalType,
                  title: "Create Record",
                  callback: createRecord,
                })
              )
            }
          />
        </Card>
      )}

      <Table
        value={data}
        dataKey="id"
        stateStorage="session"
        stateKey={modalType}
        selectionMode="single"
        emptyMessage={noRecordFoundMsg()}
        showGridlines
        removableSort
        resizableColumns
        size="small"
        paginator
        rows={rows}
        rowsPerPageOptions={[5, 10, 15]}
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink  CurrentPageReport"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="dark:bg-boxdark dark:text-slate-300"
        paginatorClassName="custom-paginator"
        totalRecords={totalRecords}
      >
        {columns?.map((col) => (
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
        {rowActions && (
          <Column
            body={rowActionsCol}
            header="Actions"
            headerClassName="dark:bg-strokedark dark:text-bodydark1"
            style={{ textAlign: "center", width: "8em" }}
          />
        )}
      </Table>
    </div>
  );
};

export default DataTable;
