import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { store } from "./redux/store/index.js";
import { Provider } from "react-redux";

import "./css/style.css";
import "./css/satoshi.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PrimeReactProvider } from "primereact/api";
import Modal from "./components/Modal.jsx";
import "flatpickr/dist/flatpickr.min.css";
import "handsontable/dist/handsontable.full.min.css";

import { registerAllModules } from "handsontable/registry";
import reportWebVitals from "./components/performanceTracker.jsx";

registerAllModules();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
      <Modal />
    </Provider>
    <ToastContainer />
  </>
);

// Only running reportWebVitals in development mode
// if (process.env.NODE_ENV === "development") {
//   reportWebVitals(console.log);
// }
