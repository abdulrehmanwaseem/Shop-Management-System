import React from "react";
import DataTable from "../../components/Datatable";
import {
  useCreateCompanyMutation,
  useDeleteCompanyMutation,
  useGetCompaniesQuery,
  useUpdateCompanyMutation,
} from "../../redux/apis/companiesApi";

const Company = () => {
  const { data } = useGetCompaniesQuery();
  const [createCompany] = useCreateCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();
  const [deleteCompany] = useDeleteCompanyMutation();

  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Name" },
  ];
  const modalType = "company";

  return (
    <DataTable
      data={data?.data}
      columns={columns}
      totalRecords={data?.totalRecords}
      createRecord={createCompany}
      updateRecord={updateCompany}
      deleteRecord={deleteCompany}
      modalType={modalType}
    />
  );
};

export default Company;
