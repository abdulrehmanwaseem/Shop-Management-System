import React from "react";
import DataTable from "../../../components/Datatable";
import {
  useCreateFieldMutation,
  useDeleteFieldMutation,
  useGetFieldsQuery,
  useUpdateFieldMutation,
} from "../../../redux/apis/fieldsApi";

const Field = () => {
  const { data } = useGetFieldsQuery();
  const [createField] = useCreateFieldMutation();
  const [updateField] = useUpdateFieldMutation();
  const [deleteField] = useDeleteFieldMutation();

  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Name" },
  ];
  const modalType = "field";

  return (
    <DataTable
      data={data?.data}
      columns={columns}
      totalRecords={data?.totalRecords}
      createRecord={createField}
      updateRecord={updateField}
      deleteRecord={deleteField}
      modalType={modalType}
    />
  );
};

export default Field;
