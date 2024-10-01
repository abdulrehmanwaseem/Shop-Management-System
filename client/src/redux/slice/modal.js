import { createSlice } from "@reduxjs/toolkit";

export const modal = createSlice({
  name: "modal",
  initialState: {
    modalType: "",
    title: "",
    open: false,
    sendId: false,
    callback: null,
    data: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.modalType = action.payload.modalType;
      state.title = action.payload.title;
      state.open = true;
      state.sendId = action.payload.sendId;
      state.callback = action.payload.callback;
      state.data = action.payload.data;
    },
    closeModal: (state) => {
      state.modalType = "";
      state.title = "";
      state.open = false;
      state.sendId = false;
      state.callback = null;
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = modal.actions;

export default modal.reducer;
