import { HotTable } from "@handsontable/react";
import { Button } from "primereact/button";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import {
  DatePicker,
  Input,
  Select,
  TextArea,
} from "../../components/FormElements";
import {
  calculateTotalAmount,
  currencyFormatter,
} from "../../lib/currencyLogic";
import { useGetExpensesQuery } from "../../redux/apis/expensesApi";
import {
  useCreateInvoiceMutation,
  useGetInvoiceConfigQuery,
  useGetInvoicesTypeQuery,
  useGetPaymentStatusQuery,
} from "../../redux/apis/invoicesApi";
import { useGetItemsQuery } from "../../redux/apis/itemsApi";
import { invoiceSchema } from "../../Validations";

const CreateInvoice = () => {
  const [tableData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const hotRef = useRef(null);
  const navigate = useNavigate();
  const colHeaders = ["ID", "Item", "Rate", "Quantity", "Amount"];

  const methods = useForm({
    resolver: invoiceSchema(totalAmount),
  });

  const invoiceType = methods.watch("invoiceTypeId");
  const paymentStatus = methods.watch("paymentStatusId");

  const { data: invoiceTypeData } = useGetInvoicesTypeQuery();
  const { data: paymentStatusData } = useGetPaymentStatusQuery();
  const { data: itemsData } = useGetItemsQuery();
  const { data: expensesData } = useGetExpensesQuery();

  const [createInvoice] = useCreateInvoiceMutation();

  const getCombinedNames = useMemo(() => {
    if (invoiceType === 1) {
      return expensesData?.data?.map((expense) => expense.name.trim());
    } else {
      return (
        invoiceType === 3
          ? itemsData?.data?.filter((item) => item.stock > 0)
          : itemsData?.data
      )?.map((item) => item.fullName);
    }
  }, [invoiceType, expensesData, itemsData]);

  const columns = [
    {
      data: "itemId",
      type: "numeric",
      allowInvalid: false,
      strict: true,
      readOnly: true,
      width: 30,
    }, // id
    {
      data: "name",
      type: "autocomplete",
      source: getCombinedNames,
      strict: true,
      allowInvalid: false,
    }, // name
    {
      data: "rate",
      type: "numeric",
      numericFormat: { pattern: "0,0.00" },
      strict: true,
      allowInvalid: false,
    }, // rate
    {
      data: "quantity",
      type: "numeric",
      strict: true,
      allowInvalid: false,
    }, // quantity
    {
      data: "amount",
      type: "numeric",
      numericFormat: { pattern: "0,0.00" },
      readOnly: true,
      allowInvalid: false,
      strict: true,
    }, // amount
  ];

  const onTableSubmit = async (formData) => {
    try {
      const hot = hotRef?.current?.hotInstance;
      const data = hot.getData();

      let isGridEmpty = true;
      let isError = false;
      data.forEach((nestedArray) => {
        if (nestedArray.every((value) => !value)) return;

        nestedArray.forEach((value) => {
          if (!value) {
            isError = true;
          } else {
            isGridEmpty = false;
          }
        });
      });

      if (isGridEmpty) {
        toast.error("Please Add Items in table to submit");
        return;
      }

      if (isError) {
        toast.error("Please Review Table Data");
        return;
      }

      const items = hot
        ?.getSourceData()
        .filter(
          (item) =>
            item.name &&
            item.itemId &&
            item.rate &&
            item.quantity &&
            item.amount
        );

      let totalPurchasePrice = 0;
      if (invoiceType === 3) {
        const itemMap = new Map(
          items.map((item) => [item.itemId, item.quantity])
        );

        totalPurchasePrice = itemsData.data.reduce((acc, item) => {
          const quantity = itemMap.get(item.id) || 0;
          if (!quantity) return acc;

          const itemCost = item.purchasePrice * quantity;

          return acc + itemCost;
        }, 0);
      }

      let { remainingAmount, paidAmount } = formData;

      if (paymentStatus === 1) {
        remainingAmount = totalAmount - (paidAmount || 0);
        paidAmount = paidAmount || 0;
      } else if (paymentStatus === 2) {
        paidAmount = totalAmount;
        remainingAmount = 0;
      } else if (paymentStatus === 3) {
        paidAmount = 0;
        remainingAmount = totalAmount;
      }

      const payload = {
        ...formData,
        amount: totalAmount,
        items,
        remainingAmount,
        paidAmount,
        ...(invoiceType === 3 && {
          revenue: parseInt(totalAmount) - parseInt(totalPurchasePrice),
        }),
      };

      await createInvoice(payload).unwrap();
      navigate("/invoices");
    } catch (error) {
      toast.error("An error occurred, try again later");
      console.log(error);
    }
  };

  const { data: invoiceConfigData } = useGetInvoiceConfigQuery(
    {
      invoiceType,
    },
    {
      skip: !invoiceType,
    }
  );

  const afterChange = useCallback((changes, source) => {
    const hot = hotRef.current?.hotInstance;

    if (source === "edit" || source === "CopyPaste.paste") {
      changes?.forEach(([row, prop, oldValue, newValue]) => {
        if (prop === "name") {
          if (oldValue !== newValue) {
            const trimNewValue = newValue ? newValue.trim() : "";

            const selectedItems = hot
              .getDataAtCol(1)
              .filter((name, rowIndex) => name && rowIndex !== row);

            const isDuplicate = selectedItems.includes(trimNewValue);
            if (isDuplicate) {
              hot.setDataAtRowProp(row, prop, oldValue);
              toast.error(
                "Item already added, please choose a different item."
              );
            } else {
              const item =
                invoiceType === 1
                  ? expensesData?.data.find(
                      (item) => item?.name?.trim() === trimNewValue
                    )
                  : itemsData?.data?.find(
                      (item) => item.fullName === trimNewValue
                    );

              const idColumn = 0;
              const rateColumn = 2;
              hot.setDataAtCell(row, idColumn, item?.id);
              if (invoiceType === 2) {
                hot.setDataAtCell(row, rateColumn, item?.purchasePrice);
              } else if (invoiceType === 3) {
                hot.setDataAtCell(row, rateColumn, item?.salePrice);
              }
            }
          }
        }
        if (prop === "rate" || prop === "quantity") {
          if (oldValue !== newValue) {
            const [itemId, name, rate, quantity, amount] =
              hot.getDataAtRow(row);
            const amountColumn = 4;
            hot.setDataAtCell(row, amountColumn, (rate || 0) * (quantity || 0));
          }
        }
      });
      const items = hot
        ?.getSourceData()
        .filter((item) => Object.keys(item).length > 0);
      setTotalAmount(calculateTotalAmount(items));
    }
  });

  const beforeChange = (changes, source) => {
    if (!invoiceType) {
      return false;
    }
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onTableSubmit)}>
          <div className="space-y-4 ">
            <Card className={"space-y-4 shadow-lg"}>
              <h1 className="text-lg font-semibold">Invoice</h1>
              <hr />
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <Select
                  label={"Invoice Type"}
                  name="invoiceTypeId"
                  placeholder="Enter invoice name"
                  options={invoiceTypeData?.data}
                  filter={false}
                />
                <DatePicker label={"Invoice Date"} name="date" />
                <Select
                  label={"Invoice Name"}
                  name="name"
                  value="name"
                  getKey="name"
                  isDisable={!invoiceType}
                  placeholder="Enter invoice name"
                  options={invoiceConfigData?.data}
                />
              </div>
              <TextArea
                label={"Particular"}
                name="particular"
                placeholder="Enter invoice particular"
              />
            </Card>
            <Card className={"space-y-4 max-h-fit shadow-lg"}>
              <span className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">Invoice Details</h1>

                {!invoiceType && (
                  <p className="text-red-500 font-medium">
                    Please select an "invoice type" to enable the table.
                  </p>
                )}
              </span>
              <hr />

              <HotTable
                data={tableData}
                ref={hotRef}
                beforeChange={beforeChange}
                afterChange={afterChange}
                colHeaders={colHeaders}
                columns={columns}
                readOnly={!invoiceType}
                stretchH="all"
                beforeRefreshDimensions={() => false}
                height={`${Math.min(tableData.length, 10) * 24 + 24}px`}
                contextMenu={true}
                manualColumnResize={true}
                manualRowResize={true}
                rowHeaders={true}
                minRows={10}
                minSpareRows={1}
                licenseKey="non-commercial-and-evaluation"
              />
            </Card>
            <Card className={"space-y-4 shadow-lg"}>
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Payment Details</h1>
                <span className="text-lg font-semibold">
                  Total Amount: {currencyFormatter.format(totalAmount)}
                </span>
              </div>
              <hr />
              <div className="flex flex-col lg:flex-row gap-4">
                <Select
                  label={"Payment Status"}
                  name="paymentStatusId"
                  placeholder="Enter invoice name"
                  options={paymentStatusData?.data}
                  filter={false}
                />
                {paymentStatus === 1 && totalAmount !== 0 ? (
                  <Input
                    label={"Paid Amount"}
                    name="paidAmount"
                    type="number"
                    maxLimit={totalAmount - 1}
                    placeholder="Enter paid amount"
                  />
                ) : null}
              </div>
              <Button
                label="Submit"
                raised
                className="w-full"
                size="small"
                type="submit"
              />
            </Card>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
export default CreateInvoice;
