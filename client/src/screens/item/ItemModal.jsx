import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input, Select } from "../../components/FormElements";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slice/modal";
import { Button } from "primereact/button";
import { useGetCompaniesQuery } from "../../redux/apis/companiesApi";
import { useGetFieldsQuery } from "../../redux/apis/fieldsApi";
import { useGetCategoriesQuery } from "../../redux/apis/categoriesApi";
import { useGetVariantsQuery } from "../../redux/apis/variantsApi";

import { ItemsSchema } from "../../Validations";

const Item = () => {
  const {
    data: itemsData,
    sendId,
    callback,
  } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const methods = useForm({
    values: itemsData,
    resolver: ItemsSchema,
  });

  const { data: companies = {} } = useGetCompaniesQuery();
  const { data: categories = {} } = useGetCategoriesQuery();
  const { data: fields = {} } = useGetFieldsQuery();
  const { data: variants = {} } = useGetVariantsQuery();

  const onSubmit = async (formData) => {
    delete formData.field;
    delete formData.company;
    delete formData.variant;
    delete formData.category;

    const companyName = companies?.data.find(
      (company) => company.id === formData.companyId
    );
    const variantName = variants?.data.find(
      (company) => company.id === formData.variantId
    );

    try {
      if (sendId) {
        await callback({
          id: itemsData.id,
          companyName: companyName.name,
          variantName: variantName.name,
          ...formData,
        });
        dispatch(closeModal());
      } else {
        await callback({
          companyName: companyName.name,
          variantName: variantName.name,
          ...formData,
        });
        dispatch(closeModal());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <Input label={"Name"} name="name" placeholder="Enter name" />

          <Select
            label={"Company Name"}
            name="companyId"
            placeholder="Enter company name"
            options={companies?.data}
          />

          <Input
            label={"Description"}
            name="description"
            placeholder="Enter description"
          />
          <Select
            label={"Category"}
            name="categoryId"
            placeholder="Enter category name"
            options={categories?.data}
          />
          <Select
            label={"Field"}
            name="fieldId"
            placeholder="Enter field name"
            options={fields?.data}
          />
          <Select
            label={"Variant"}
            name="variantId"
            placeholder="Enter variant name"
            options={variants?.data}
          />
          <Input
            label={"Purchase Price"}
            name="purchasePrice"
            type="number"
            placeholder="Enter description"
          />
          <Input
            label={"Sale Price"}
            name="salePrice"
            type="number"
            placeholder="Enter description"
          />
          <Input
            label={"Low On Stock"}
            name="lowOnStock"
            type="number"
            placeholder="Enter description"
          />

          <Button label="Submit" raised className="w-full py-3" size="small" />
        </form>
      </FormProvider>
    </div>
  );
};

export default Item;
