"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { httpRequest } from "@/utils/http";
import { Income } from "@/utils/interfaces";
import moment from "moment";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FadeLoader } from "react-spinners";

function Page() {
  const [income, setIncome] = useState<Income[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await httpRequest("GET", "/income");

      if (response) {
        setLoading(false);
        setIncome(response);
        console.log(response);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "Title",
      selector: (row: Income) => row.title,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row: Income) => Intl.NumberFormat().format(row.amount),
      sortable: true,
    },
    {
      name: "Count",
      selector: (row: Income) => row.count,
      sortable: true,
    },
    {
      name: "Project",
      selector: (row: Income) => row.project.name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: Income) => moment(row.created_at).format("DD-MM-Y"),
      sortable: true,
    },
  ];

  return (
    <DashboardLayout>
      <div className="h-screen">
        <div className="text-xl mb-5 font-bold">Income</div>
        <div>
          {loading ? (
            <div className="flex flex-row items-center justify-center">
              <FadeLoader color="#ffbb00" />
            </div>
          ) : income.length == 0 ? (
            <div className="text-center text-xl">
              <h3>No income currently</h3>
            </div>
          ) : (
            <div>
              <DataTable
                className="border border-gray-400"
                columns={columns}
                data={income}
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Page;
