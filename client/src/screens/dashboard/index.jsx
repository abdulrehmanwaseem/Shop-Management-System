import React, { useMemo } from "react";
import CardDataStats from "../../components/CardDataStats";

import { DatePicker } from "../../components/FormElements";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import {
  useGetDashboardMutation,
  useGetDashboardTablesDataMutation,
} from "../../redux/apis/dashboardApi";
import { currencyFormatter } from "../../lib/currencyLogic";
import { dashboardSchema } from "../../Validations";
import {
  lowOnStockItemsColumn,
  recievableItemsColumn,
  payableItemsColumn,
  payableExpensesColumn,
} from "./columns.js";
import DataTable from "../../components/Datatable.jsx";
import Card from "../../components/Card.jsx";

const Dashboard = () => {
  const [getDashboardData, { data }] = useGetDashboardMutation();
  const [getDashboardTablesData, { data: tablesData }] =
    useGetDashboardTablesDataMutation();

  const methods = useForm({
    resolver: dashboardSchema,
  });

  const onSubmit = async (formData) => {
    await getDashboardData(formData);
    await getDashboardTablesData(formData);
  };

  const totalCharity = useMemo(
    () => Math.ceil(data?.data?.totalRevenue * 0.01),
    [data?.data?.totalRevenue]
  );

  return (
    <div className="space-y-6">
      <div className="rounded-sm border shadow-default border-stroke bg-white dark:border-strokedark dark:bg-boxdark p-3 ">
        <FormProvider {...methods}>
          <form
            className="flex gap-4 items-center"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <DatePicker mode="range" name="dateRange" py="3" />
            <Button
              label="Filter"
              raised
              size="small"
              className="w-24"
              type="submit"
            />
          </form>
        </FormProvider>
      </div>
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6  gap-6">
          <CardDataStats
            title="Total Purchases"
            total={currencyFormatter.format(
              data?.data?.totalPurchase.finalAmount || 0
            )}
          ></CardDataStats>
          <CardDataStats
            title="Total Sales"
            total={currencyFormatter.format(
              data?.data?.totalSale.finalAmount || 0
            )}
          ></CardDataStats>
          <CardDataStats
            title="Total Expenses"
            total={currencyFormatter.format(data?.data?.totalExpense || 0)}
          ></CardDataStats>
          <CardDataStats
            title="Total Payable"
            total={currencyFormatter.format(
              data?.data?.totalPurchase.remainingAmount || 0
            )}
          ></CardDataStats>
          <CardDataStats
            title="Total Recievable"
            total={currencyFormatter.format(
              data?.data?.totalSale.remainingAmount || 0
            )}
          ></CardDataStats>
          <CardDataStats
            title="Total Revenue"
            total={currencyFormatter.format(data?.data?.totalRevenue || 0)}
          ></CardDataStats>
          <CardDataStats
            title="Expected Revenue"
            total={currencyFormatter.format(data?.data?.expectedRevenue || 0)}
          ></CardDataStats>
          <CardDataStats
            title="Total Inventory"
            total={currencyFormatter.format(data?.data?.totalInventory || 0)}
          ></CardDataStats>
          <CardDataStats
            title="Cash in Hand"
            total={currencyFormatter.format(data?.data?.amountInCash || 0)}
          ></CardDataStats>
          <CardDataStats
            title="Charity Contribution"
            total={currencyFormatter.format(
              totalCharity > 0 ? totalCharity : 0
            )}
          ></CardDataStats>
          <CardDataStats
            title="Charity Contribution"
            total={currencyFormatter.format(data?.data?.test || 0)}
          ></CardDataStats>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-4">
            <p className="font-semibold text-lg">Total Payable Items</p>
            <DataTable
              rows={5}
              columns={payableItemsColumn}
              data={tablesData?.data?.payableItems}
              rowActions={false}
              addBtn={false}
            />
          </Card>
          <Card className="space-y-4">
            <p className="font-semibold text-lg">Total Receivable Items</p>
            <DataTable
              rows={5}
              columns={recievableItemsColumn}
              data={tablesData?.data?.recievableItems}
              rowActions={false}
              addBtn={false}
            />
          </Card>
          <Card className="space-y-4 overflow-auto">
            <p className="font-semibold text-lg">Low On Stock Items</p>
            <DataTable
              rows={5}
              columns={lowOnStockItemsColumn}
              data={tablesData?.data?.lowOnStockItems}
              rowActions={false}
              addBtn={false}
            />
          </Card>
          <Card className="space-y-4 overflow-auto">
            <p className="font-semibold text-lg">Total Payable Expenses</p>
            <DataTable
              rows={5}
              columns={payableExpensesColumn}
              data={tablesData?.data?.expenseItems}
              rowActions={false}
              addBtn={false}
            />
          </Card>
        </div>
      </>
    </div>
  );
};

export default Dashboard;
