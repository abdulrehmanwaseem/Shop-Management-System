import React, { useState, ReactNode, Suspense } from "react";
import Header from "../components/Header/index";
import Sidebar from "../components/Sidebar/index";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(true);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark ">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden ">
        {/* <!-- ===== Sidebar Start ===== --> */}

        {toggleSidebar && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden customized-scrollbar">
          {/* <!-- ===== Header Start ===== --> */}
          <Header
            sidebarOpen={sidebarOpen}
            setToggleSidebar={setToggleSidebar}
            setSidebarOpen={setSidebarOpen}
          />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div
              className={`mx-auto ${
                toggleSidebar && "max-w-screen-3xl"
              } p-8s md:p-4 2xl:p-8`}
            >
              <Suspense
                fallback={
                  <p className="font-semibold text-lg loading-text"></p>
                }
              >
                <Outlet />
              </Suspense>
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
