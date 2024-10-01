import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/slice/modal";
import { Dialog } from "primereact/dialog";
import ConfirmationModal from "./ConfirmationModal";
import CustomerModal from "../screens/customer/CustomerModal";
import CompanyModal from "../screens/company/CompanyModal";
import VendorModal from "../screens/vendor/VendorModal";
import Item from "../screens/item/ItemModal";
import ExpenseModal from "../screens/expense/ExpenseModal";
import PreviewInvoiceModal from "../screens/invoice/PreviewInvoiceModal";
import CancelInvoiceModal from "../screens/invoice/CancelInvoiceModal";
import UpdateInvoiceModal from "../screens/invoice/UpdateInvoiceModal";
import CategoryModal from "../screens/item/category/CategoryModal";
import FieldModal from "../screens/item/field/FieldModal";
import VariantModel from "../screens/item/variant/VariantModel";

const Modal = () => {
  const dispatch = useDispatch();
  const { open, modalType, title } = useSelector((state) => state.modal);
  return (
    <Dialog
      contentClassName="dark:bg-boxdark"
      className="z-40"
      headerClassName="dark:bg-boxdark dark:text-bodydark1"
      header={title}
      visible={open}
      maximizable
      onHide={() => {
        if (!open) return;
        dispatch(closeModal());
      }}
      style={{ minWidth: "35vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
      <div className="m-0 dark:text-bodydark1">{checkModal(modalType)}</div>
    </Dialog>
  );
};

export default Modal;

const checkModal = (name) => {
  let component = null;
  switch (name) {
    case "customer":
      component = <CustomerModal />;
      break;
    case "company":
      component = <CompanyModal />;
      break;
    case "confirmation":
      component = <ConfirmationModal />;
      break;
    case "vendor":
      component = <VendorModal />;
      break;
    case "item":
      component = <Item />;
      break;
    case "expense":
      component = <ExpenseModal />;
      break;
    case "previewInvoice":
      component = <PreviewInvoiceModal />;
      break;
    case "cancelInvoice":
      component = <CancelInvoiceModal />;
      break;
    case "updateInvoice":
      component = <UpdateInvoiceModal />;
      break;
    case "category":
      component = <CategoryModal />;
      break;
    case "field":
      component = <FieldModal />;
      break;
    case "variant":
      component = <VariantModel />;
      break;
    case "":
      component = <span>No Modal Find With This Type</span>;
  }
  return component;
};
