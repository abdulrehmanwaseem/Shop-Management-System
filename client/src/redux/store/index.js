import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { authSlice } from "../slice/auth";
import { apis } from "../apis/baseApi";
import { modal } from "../slice/modal";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [modal.name]: modal.reducer,

    [apis.reducerPath]: apis.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apis.middleware),
});

setupListeners(store.dispatch);
