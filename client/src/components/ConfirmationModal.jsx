import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../redux/slice/modal";
import { Button } from "primereact/button";

const ConfirmationModal = () => {
  const dispatch = useDispatch();
  const { data, callback } = useSelector((state) => state.modal);
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await callback({ id: data?.id }).unwrap();
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-1" onSubmit={formSubmitHandler}>
      <p>Are you sure? you want to delete this!</p>
      <div className="flex justify-between mt-4 -mb-2">
        <Button label="Confirm" outlined raised type="submit" size="small" />
        <Button
          label="Cancel"
          outlined
          raised
          size="small"
          type="button"
          onClick={() => dispatch(closeModal())}
        />
      </div>
    </form>
  );
};

export default ConfirmationModal;
