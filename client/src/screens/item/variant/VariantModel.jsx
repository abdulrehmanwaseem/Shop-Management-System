import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../../components/FormElements";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/slice/modal";
import { Button } from "primereact/button";
import { CompaniesSchema } from "../../../Validations";

const VariantModel = () => {
  const { data, sendId, callback } = useSelector((state) => state.modal);

  const methods = useForm({
    values: data,
    resolver: CompaniesSchema,
  });
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    try {
      if (sendId) {
        await callback({ id: data.id, ...formData });
        dispatch(closeModal());
      } else {
        await callback(formData);
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
          <Button label="Submit" raised className="w-full py-3" size="small" />
        </form>
      </FormProvider>
    </div>
  );
};

export default VariantModel;
