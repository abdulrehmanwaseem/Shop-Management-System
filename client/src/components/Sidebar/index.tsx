import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import {
  BadgeDollarSign,
  ClipboardMinus,
  LayoutDashboard,
  ReceiptText,
  Settings,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (!sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-30 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-4   ">
        <button
          ref={trigger}
          className="lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        ></button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 font-semibold text-bodydark2 text-xl">
              <img src="/logo3.jpg" className="rounded-2xl w-64 h-22" alt="" />
              <button
                ref={trigger}
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              ></button>
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname === "/" && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  {/* Icon */}
                  <LayoutDashboard />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/invoices"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("invoices") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  {/* Icon */}
                  <ReceiptText />
                  Invoices
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/transactions"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("transactions") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  {/* Icon */}
                  <BadgeDollarSign />
                  Transactions
                </NavLink>
              </li>
              <SidebarLinkGroup
                activeCondition={pathname === "/" || pathname.includes("/")}
              >
                {(handleClick, open) => {
                  return (
                    <>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes("customers") ||
                          pathname.includes("vendors") ||
                          pathname.includes("companies") ||
                          pathname.includes("items") ||
                          pathname.includes("expenses")
                            ? "bg-graydark dark:bg-meta-4"
                            : ""
                        } `}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <Settings />
                        Settings
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && "rotate-180"
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/companies"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Companies
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/vendors"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Vendors
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/customers"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Customers
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/expenses"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Expenses
                            </NavLink>
                          </li>
                          <SidebarLinkGroup
                            activeCondition={
                              pathname === "/" || pathname.includes("/")
                            }
                          >
                            {(handleClick, open) => {
                              return (
                                <>
                                  <NavLink
                                    to="#" // Navigate directly to /items
                                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                      pathname.includes("categories") ||
                                      pathname.includes("fields") ||
                                      pathname.includes("variants")
                                        ? "bg-graydark dark:bg-meta-4"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      setSidebarExpanded(true);
                                      handleClick();
                                    }}
                                  >
                                    Inventory
                                    <svg
                                      className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                        open && "rotate-180"
                                      }`}
                                      width="20"
                                      height="20"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                        fill=""
                                      />
                                    </svg>
                                  </NavLink>
                                  {/* <!-- Dropdown Menu Start --> */}
                                  <div
                                    className={`translate transform overflow-hidden ${
                                      !open && "hidden"
                                    }`}
                                  >
                                    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                      <li>
                                        <NavLink
                                          to="/items/home"
                                          className={({ isActive }) =>
                                            "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                            (isActive && "!text-white")
                                          }
                                        >
                                          Items
                                        </NavLink>
                                      </li>
                                      <li>
                                        <NavLink
                                          to="/items/categories"
                                          className={({ isActive }) =>
                                            "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                            (isActive && "!text-white")
                                          }
                                        >
                                          Categories
                                        </NavLink>
                                      </li>
                                      <li>
                                        <NavLink
                                          to="/items/fields"
                                          className={({ isActive }) =>
                                            "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                            (isActive && "!text-white")
                                          }
                                        >
                                          Fields
                                        </NavLink>
                                      </li>
                                      <li>
                                        <NavLink
                                          to="/items/variants"
                                          className={({ isActive }) =>
                                            "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                            (isActive && "!text-white")
                                          }
                                        >
                                          Variants
                                        </NavLink>
                                      </li>
                                    </ul>
                                  </div>
                                </>
                              );
                            }}
                          </SidebarLinkGroup>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
