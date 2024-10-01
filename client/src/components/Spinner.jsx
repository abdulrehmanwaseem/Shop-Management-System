import React from "react";

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0  z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    </div>
  );
};
export default Spinner;
