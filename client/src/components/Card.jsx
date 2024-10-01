import React from "react";
import { twMerge } from "tailwind-merge";

const Card = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "rounded-sm p-4 border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
