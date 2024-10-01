import React from "react";
import DataTable from "../../components/Datatable";
import {
  useCreateCustomerMutation,
  useDeleteCustomerMutation,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
} from "../../redux/apis/customersApi";

const Customer = () => {
  const { data } = useGetCustomersQuery();
  const [createCustomer] = useCreateCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Name" },
    { field: "contact1", header: "Contact-1" },
    { field: "contact2", header: "Contact-2" },
    { field: "address", header: "Address" },
  ];
  const modalType = "customer";

  return (
    <DataTable
      data={data?.data}
      columns={columns}
      totalRecords={data?.totalRecords}
      createRecord={createCustomer}
      updateRecord={updateCustomer}
      deleteRecord={deleteCustomer}
      modalType={modalType}
    />
  );
};

export default Customer;
