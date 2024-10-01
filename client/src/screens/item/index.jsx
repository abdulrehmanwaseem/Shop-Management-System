import React from "react";
import DataTable from "../../components/Datatable";
import {
  useCreateItemMutation,
  useDeleteItemMutation,
  useGetItemsQuery,
  useUpdateItemMutation,
} from "../../redux/apis/itemsApi";
import { currencyFormatter } from "../../lib/currencyLogic";

const Item = () => {
  const { data } = useGetItemsQuery();
  const [createItem] = useCreateItemMutation();
  const [updateItem] = useUpdateItemMutation();
  const [deleteItem] = useDeleteItemMutation();

  const columns = [
    { field: "id", header: "Id" },
    { field: "fullName", header: "Full Name" },
    { field: "company", header: "Company Name" },
    { field: "description", header: "Description" },
    { field: "category", header: "Category" },
    { field: "field", header: "Field" },
    { field: "variant", header: "Variant" },
    {
      field: "oldPurchasePrice",
      header: "Old Purchase Price",
      body: ({ oldPurchasePrice }) => {
        return <span>{currencyFormatter.format(oldPurchasePrice)}</span>;
      },
    },
    {
      field: "purchasePrice",
      header: "Purchase Price",
      body: ({ purchasePrice }) => {
        return <span>{currencyFormatter.format(purchasePrice)}</span>;
      },
    },
    {
      field: "oldSalePrice",
      header: "Old Sale Price",
      body: ({ oldSalePrice }) => {
        return <span>{currencyFormatter.format(oldSalePrice)}</span>;
      },
    },
    {
      field: "salePrice",
      header: "Sale Price",
      body: ({ salePrice }) => {
        return <span>{currencyFormatter.format(salePrice)}</span>;
      },
    },

    { field: "stock", header: "Stock" },
    { field: "lowOnStock", header: "Low On Stock" },
  ];

  const modalType = "item";
  console.log(data?.totalRecords);
  return (
    <DataTable
      data={data?.data}
      columns={columns}
      totalRecords={data?.totalRecords}
      createRecord={createItem}
      updateRecord={updateItem}
      deleteRecord={deleteItem}
      modalType={modalType}
    />
  );
};

export default Item;
