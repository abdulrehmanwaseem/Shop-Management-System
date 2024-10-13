import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

export const loginSchema = yupResolver(
  yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().min(4).max(20).required("Password is required"),
  })
);

export const customerSchema = yupResolver(
  yup.object({
    name: yup.string().required("Customer name is required"),
    contact1: yup
      .string()
      .notRequired()
      .typeError("Contact 1 is optional and if provided (must be a number)"),
    contact2: yup
      .string()
      .notRequired()
      .typeError("Contact 2 is optional and if provided (must be a number)"),
    address: yup.string().optional(),
  })
);

export const ItemsSchema = yupResolver(
  yup.object({
    name: yup.string().required("Item name is required"),
    companyId: yup.number().required("Company is required"),
    categoryId: yup.number().required("Category is required"),
    fieldId: yup.number().required("Field is required"),
    variantId: yup.number().required("Variant is required"),
    description: yup.string().notRequired(),
    purchasePrice: yup.number().typeError("Purchase Price is required"),
    salePrice: yup.number().typeError("Sale Price is required"),
    lowOnStock: yup.number().typeError("Low On Stock is required"),
  })
);

export const VendorsSchema = yupResolver(
  yup.object({
    name: yup.string().required("Vendor name is required"),
    contact1: yup
      .string()
      .notRequired()
      .typeError("Contact 1 is optional and if provided (must be a number)"),
    contact2: yup
      .string()
      .notRequired()
      .typeError("Contact 2 is optional and if provided (must be a number)"),
    address: yup.string().optional(),
  })
);

export const CompaniesSchema = yupResolver(
  yup.object({
    name: yup.string().required("Company name is required"),
  })
);

export const ExpensesSchema = yupResolver(
  yup.object({
    name: yup.string().required("Expenses name is required"),
  })
);

export const invoiceSchema = (totalAmount) =>
  yupResolver(
    yup.object({
      invoiceTypeId: yup.number().required("Invoice Type is required"),
      date: yup.string().required("Invoice Date is required"),
      name: yup.string().required("Invoice Name is required"),
      particular: yup.string().required("Particular is required"),
      paymentStatusId: yup.number().required("Payment Status is required"),
      // paidAmount: yup.number().when("paymentStatusId", {
      //   is: (paymentStatusId) => paymentStatusId === 1,
      //   then: (schema) => schema.required("Paid Amount is required"),
      //   otherwise: (schema) => schema.optional(),
      // }),
    })
  );

export const dashboardSchema = yupResolver(
  yup.object({
    dateRange: yup.string().required("Date Range is required"),
  })
);

export const validateTable = (hotRef) => {
  const data = hotRef.getData();
  let isGridEmpty = true;
  let isError = false;
  data.forEach((nestedArray, rowIndex) => {
    if (nestedArray.every((value) => !value)) return;

    nestedArray.forEach((value, columnIndex) => {
      if (!value) {
        hotRef.setCellMeta(rowIndex, columnIndex, "className", "invalid-cell");
        isError = true;
      } else {
        hotRef.setCellMeta(rowIndex, columnIndex, "className", "invalid-cell");
        isGridEmpty = false;
      }
    });
  });

  console.log(isError);
  if (isGridEmpty) {
    toast.error("Please Add Items in table to submit");
  } else {
    hotRef.render();
  }

  return !isError && !isGridEmpty;
};
export const updateInvoiceSchema = (prevRemainingAmount) =>
  yupResolver(
    yup.object({
      paymentStatusId: yup.number().required("Payment Status is required"),
      discount: yup
        .number()
        .min(0, "Discount cannot be negative")
        .max(
          prevRemainingAmount - 1,
          "Discount should be less than the remaining amount"
        )
        .typeError("Discount is required")
        .required("Discount is required"),
      remainingAmount: yup
        .number()
        .min(0, "Remaining amount cannot be negative")
        .max(
          prevRemainingAmount - 1,
          `Remaining amount must be less than ${prevRemainingAmount}`
        )
        .typeError("Remaining Amount is required")
        .required("Remaining Amount is required"),
    })
  );
