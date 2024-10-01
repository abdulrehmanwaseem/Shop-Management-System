import React from "react";
import DataTable from "../../../components/Datatable";

import {
  useCreateVariantMutation,
  useDeleteVariantMutation,
  useGetVariantsQuery,
  useUpdateVariantMutation,
} from "../../../redux/apis/variantsApi";

const Variant = () => {
  const { data } = useGetVariantsQuery();
  const [createVariant] = useCreateVariantMutation();
  const [updateVariant] = useUpdateVariantMutation();
  const [deleteVariant] = useDeleteVariantMutation();

  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Name" },
  ];
  const modalType = "variant";

  return (
    <DataTable
      data={data?.data}
      columns={columns}
      totalRecords={data?.totalRecords}
      createRecord={createVariant}
      updateRecord={updateVariant}
      deleteRecord={deleteVariant}
      modalType={modalType}
    />
  );
};

export default Variant;
