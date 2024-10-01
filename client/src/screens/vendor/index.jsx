import React from "react";
import DataTable from "../../components/Datatable";
import {
  useCreateVendorMutation,
  useDeleteVendorMutation,
  useGetVendorsQuery,
  useUpdateVendorMutation,
} from "../../redux/apis/vendorsApi";

const Vendor = () => {
  const { data } = useGetVendorsQuery();
  const [createVendor] = useCreateVendorMutation();
  const [updateVendor] = useUpdateVendorMutation();
  const [deleteVendor] = useDeleteVendorMutation();

  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Name" },
    { field: "contact1", header: "Contact-1" },
    { field: "contact2", header: "Contact-2" },
    { field: "address", header: "Address" },
  ];
  const modalType = "vendor";

  return (
    <DataTable
      data={data?.data}
      columns={columns}
      totalRecords={data?.totalRecords}
      createRecord={createVendor}
      updateRecord={updateVendor}
      deleteRecord={deleteVendor}
      modalType={modalType}
    />
  );
};

export default Vendor;
