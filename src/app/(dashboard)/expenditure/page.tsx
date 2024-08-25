"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { httpRequest } from "@/utils/http";
import { Expenditure } from "@/utils/interfaces";
import moment from "moment";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FadeLoader } from "react-spinners";

function Page() {
  const [expenditure, setExpenditure] = useState<Expenditure[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await httpRequest("GET", "/expenditure");

      if (response) {
        setLoading(false);
        setExpenditure(response);
      }
    } catch (error) {}
  };

  const columns = [
    {
      name: "Title",
      selector: (row: Expenditure) => row.title,
      sortable: true
    },
    {
      name: "Amount",
      selector: (row: Expenditure) => Intl.NumberFormat().format(row.amount),
      sortable: true
    },
    {
      name: "Count",
      selector: (row: Expenditure) => row.count,
      sortable: true
    },
    {
      name: "Project",
      selector: (row: Expenditure) => row.project.name,
      sortable: true
    },
    {
      name: "Date",
      selector: (row: Expenditure) => moment(row.created_at).format("DD-MM-Y"),
      sortable: true
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
     <div className="h-screen">
     <div className="text-xl mb-5 font-bold">Expenditure</div>
      <div>
        {loading ? (
          <div className="flex flex-row items-center justify-center">
            <FadeLoader color="#ffbb00" />
          </div>
        ) : (
          <div>
            <DataTable className="border border-gray-400" columns={columns} data={expenditure} selectableRows />
          </div>
        )}
      </div>
     </div>
    </DashboardLayout>
  );
}

export default Page;
