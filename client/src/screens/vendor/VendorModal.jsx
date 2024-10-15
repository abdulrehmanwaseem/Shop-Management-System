import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../components/FormElements";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slice/modal";
import { Button } from "primereact/button";
import { VendorsSchema } from "../../Validations";

const VendorModal = () => {
  const { data, sendId, callback } = useSelector((state) => state.modal);

  const methods = useForm({
    values: data,
    resolver: VendorsSchema,
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
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <Input label={"Name"} name="name" placeholder="Enter name" />
        <Input
          label={"Contact-1"}
          name="contact1"
          type="number"
          placeholder="Enter contact-1"
        />
        <Input
          label={"Contact-2 (optional)"}
          name="contact2"
          type="number"
          placeholder="Enter contact-2"
        />
        <Input label={"Address"} name="address" placeholder="Enter address" />

        <Button label="Submit" raised className="w-full py-3" size="small" />
      </form>
    </FormProvider>
  );
};

export default VendorModal;
