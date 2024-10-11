import React from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/slice/modal";
import { FormProvider, useForm } from "react-hook-form";
import { Input, Select } from "../../components/FormElements";
import { currencyFormatter } from "../../lib/currencyLogic";
import Card from "../../components/Card";
import { useGetPaymentStatusQuery } from "../../redux/apis/invoicesApi";

const UpdateInvoiceModal = () => {
  const { data, callback } = useSelector((state) => state.modal);
  const { data: paymentStatusData } = useGetPaymentStatusQuery();
  const methods = useForm({
    values: {
      paymentStatusId: data.paymentStatusId,
      remainingAmount: data.remainingAmount,
      paidAmount: data.paidAmount,
      discount: 0,
    },
  });
  const dispatch = useDispatch();
  const paymentStatus = methods.watch("paymentStatusId");

  const onSubmit = async (formData) => {
    let { remainingAmount, paidAmount, paymentStatusId, discount } = formData;

    const totalAfterDiscount = parseInt(data.amount) - parseInt(discount);

    // When payment status is 'partial' (statusId = 1)
    if (paymentStatus === 1) {
      // Paid amount is the sum of the new payment and previous payments
      paidAmount = parseInt(remainingAmount) + parseInt(data.paidAmount);

      // Calculate the remaining amount, subtracting discount as well
      remainingAmount =
        parseInt(data.remainingAmount) -
        parseInt(remainingAmount) -
        parseInt(discount);

      // If the full amount after discount is paid, mark it as fully paid
      if (totalAfterDiscount === paidAmount) paymentStatusId = 2;
    }
    // When payment status is 'paid' (statusId = 2)
    else if (paymentStatus === 2) {
      paidAmount = parseInt(data.amount); // Full amount is paid
      remainingAmount = 0; // No remaining amount
    }

    const amountPaid =
      parseInt(data.remainingAmount) -
      parseInt(discount) -
      parseInt(remainingAmount);

    await callback({
      id: data.id,
      ...formData,
      remainingAmount,
      invoiceType: data.invoiceType,
      amountPaid,
      amount: data.amount,
      paidAmount,
      paymentStatusId,
    }).unwrap();

    dispatch(closeModal());
  };
  const filteredOptions =
    data.paymentStatusId === 1
      ? paymentStatusData?.data?.filter((val) => val.id !== 3)
      : paymentStatusData?.data;
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <Card className="flex flex-col lg:flex-row gap-2 justify-between font-semibold">
            <p className="flex flex-col items-center">
              Total Amount:
              <span>{currencyFormatter.format(data?.amount)}</span>
            </p>
            <div className="border-b-2 lg:border-l-2 border-gray-500"></div>
            <p className="flex flex-col items-center">
              Paid Amount:
              <span>{currencyFormatter.format(data?.paidAmount)}</span>
            </p>
            <div className="border-b-2 lg:border-l-2 border-gray-500"></div>
            <p className="flex flex-col items-center">
              Remaining Amount:
              <span>{currencyFormatter.format(data?.remainingAmount)}</span>
            </p>
          </Card>
          <Select
            label={"Payment Status"}
            name="paymentStatusId"
            placeholder="Enter invoice name"
            hideOptionId={3}
            options={filteredOptions}
            filter={false}
          />
          {paymentStatus === 1 && (
            <Input
              label={"Pay Remaining Amount"}
              name="remainingAmount"
              type="number"
              maxLimit={data?.remainingAmount}
              placeholder="Enter name"
            />
          )}
          {paymentStatus !== 3 && (
            <Input
              label={"Discount Amount"}
              name="discount"
              type="number"
              maxLimit={data?.remainingAmount - 1}
              placeholder="Enter name"
            />
          )}
          <Button label="Submit" raised className="w-full py-3" size="small" />
        </form>
      </FormProvider>
    </div>
  );
};

export default UpdateInvoiceModal;
