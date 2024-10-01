import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { currencyFormatter } from "../../lib/currencyLogic";
import moment from "moment";
import { Button } from "primereact/button";
import { useReactToPrint } from "react-to-print";
import WhatsAppIcon from "../../images/icon/whatsappIcon.png";

const PreviewInvoiceModal = () => {
  const componentRef = useRef();
  const { data } = useSelector((state) => state.modal);
  const {
    id,
    name,
    date,
    amount,
    paymentStatus,
    invoiceType,
    paidAmount,
    remainingAmount,
    particular,
    items,
  } = data;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice#${id}_${invoiceType}_${name}.pdf`,
  });

  const handleSendClick = async () => {
    const url = `https://web.whatsapp.com/send?text=${encodeURIComponent(
      `Please find the invoice attached: `
    )}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="border-2 p-6">
        <div ref={componentRef} className="text-xs text-black dark:text-white">
          <div className="flex items-start justify-between mb-3 text-right">
            <div className="flex flex-col  items-start ">
              <div className="text-gray-700 font-semibold text-lg mb-2">
                National Autos
              </div>

              <div className="text-gray-700 space-y-1 text-start">
                {invoiceType !== "Expense" && (
                  <div className="text-md">
                    Party Name:
                    <span className="font-semibold"> {name}</span>
                  </div>
                )}
                <div className="text-md">
                  Particular:
                  <span className="font-semibold"> {particular}</span>
                </div>
              </div>
            </div>

            <div className="text-gray-700 space-y-1">
              <div className="font-bold text-xl mb-2">INVOICE #{id}</div>
              <div className="text-md">
                Date:
                <span className="font-semibold">
                  {moment(date).format("DD/MMM/YYYY")}
                </span>
              </div>
              <div className="text-md">
                Type: <span className=" font-semibold">{invoiceType}</span>
              </div>
              <div className="text-md">
                Status: <span className=" font-semibold">{paymentStatus}</span>
              </div>
            </div>
          </div>

          <table className="w-full text-left my-2">
            <thead>
              <tr className="border-b">
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th align="right">Total</th>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(items || "[]")?.map((val) => (
                <tr className="border-b" key={val.name}>
                  <td>{val.name}</td>
                  <td>{val.quantity}</td>
                  <td>{val.rate}</td>
                  <td align="right">{currencyFormatter.format(val.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-end mb-3">
            <div className="text-gray-700 font-bold">
              {currencyFormatter.format(amount)}
            </div>
          </div>
          <div className="space-y-1">
            <h2 className=" font-bold">Payment Details:</h2>
            <div className="text-gray-700">
              Paid Amount:{" "}
              <span className="text-gray-700 font-bold">
                {currencyFormatter.format(paidAmount)}
              </span>
            </div>
            <div className="text-gray-700">
              Remaining Amount:{" "}
              <span className="text-gray-700 font-bold">
                {currencyFormatter.format(remainingAmount)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-4 -mb-2 justify-end gap-4">
        <Button
          raised
          size="small"
          className="bg-green-500 text-white gap-1 flex items-center justify-center"
          onClick={handleSendClick}
        >
          <img src={WhatsAppIcon} alt="icon" width={30} />
          Share To Whatsapp
        </Button>

        <Button raised size="small" onClick={handlePrint}>
          Download Invoice
        </Button>
      </div>
    </>
  );
};

export default PreviewInvoiceModal;
