import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children }) => {
  return (
    <Link
      to="#"
      className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-bodydark1 hover:bg-opacity-90 lg:px-8 xl:px-10"
    >
      {children}
    </Link>
  );
};

export default Button;
