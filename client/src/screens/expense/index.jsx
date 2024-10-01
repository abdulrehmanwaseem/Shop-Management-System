import React from "react";
import DataTable from "../../components/Datatable";
import {
  useUpdateExpenseMutation,
  useCreateExpenseMutation,
  useGetExpensesQuery,
  useDeleteExpenseMutation,
} from "../../redux/apis/expensesApi";

const Expense = () => {
  const { data } = useGetExpensesQuery();
  const [createExpense] = useCreateExpenseMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();

  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Name" },
  ];
  const modalType = "expense";

  return (
    <DataTable
      data={data?.data}
      columns={columns}
      totalRecords={data?.totalRecords}
      createRecord={createExpense}
      updateRecord={updateExpense}
      deleteRecord={deleteExpense}
      modalType={modalType}
    />
  );
};

export default Expense;
