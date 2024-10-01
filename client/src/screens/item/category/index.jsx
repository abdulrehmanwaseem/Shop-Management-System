import React from "react";
import DataTable from "../../../components/Datatable";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../../redux/apis/categoriesApi";

const Category = () => {
  const { data } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Name" },
  ];
  const modalType = "category";

  return (
    <DataTable
      data={data?.data}
      columns={columns}
      totalRecords={data?.totalRecords}
      createRecord={createCategory}
      updateRecord={updateCategory}
      deleteRecord={deleteCategory}
      modalType={modalType}
    />
  );
};

export default Category;
