import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Spinner from "./components/Spinner";

import { setAuthenticated } from "./redux/slice/auth";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserProfileQuery } from "./redux/apis/authApi";

// Screens Import:
import AppLayout from "./layout/AppLayout";
import ErrorPage from "./screens/error";

const Authentication = lazy(() => import("./screens/auth"));
const Dashboard = lazy(() => import("./screens/dashboard"));
const Customer = lazy(() => import("./screens/customer"));
const Company = lazy(() => import("./screens/company"));
const Vendor = lazy(() => import("./screens/vendor"));
const Item = lazy(() => import("./screens/item"));
const Category = lazy(() => import("./screens/item/category"));
const Field = lazy(() => import("./screens/item/field"));
const Variant = lazy(() => import("./screens/item/variant"));
const Expense = lazy(() => import("./screens/expense"));
const Invoice = lazy(() => import("./screens/invoice"));
const CreateInvoice = lazy(() => import("./screens/invoice/CreateInvoice"));

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, isSuccess, isFetching, isLoading } = useGetUserProfileQuery();

  const isSomeQueryPending = useSelector(
    (state) =>
      Object.values(state.apis.queries).some(
        (query) => query.status === "pending"
      ) ||
      Object.values(state.apis.mutations).some(
        (query) => query.status === "pending"
      )
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthenticated({ userData: data?.user }));
    }
  }, [isFetching]);

  // Using for not seeing auth screen jitter
  if (isLoading) {
    return;
  }

  return (
    <>
      {isSomeQueryPending && <Spinner />}
      {!isAuthenticated ? (
        <>
          <Suspense
            fallback={<p className="font-semibold text-lg loading-text"></p>}
          >
            <Authentication />
          </Suspense>
        </>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index path="/" element={<Dashboard />} />
              <Route path="/customers" element={<Customer />} />
              <Route path="/companies" element={<Company />} />
              <Route path="/vendors" element={<Vendor />} />

              <Route path="/items/home" element={<Item />} />
              <Route path="/items/categories" element={<Category />} />
              <Route path="/items/fields" element={<Field />} />
              <Route path="/items/variants" element={<Variant />} />

              <Route path="/expenses" element={<Expense />} />
              <Route path="/invoices" element={<Invoice />} />
              <Route path="/invoices/create" element={<CreateInvoice />} />
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
