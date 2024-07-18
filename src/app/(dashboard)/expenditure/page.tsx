"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { httpRequest } from "@/utils/http";
import { Expenditure } from "@/utils/interfaces";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div>
        {loading ? (
          <div className="flex flex-row items-center justify-center">
            <FadeLoader color="#ffbb00" />
          </div>
        ) : (
          <div>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Count</th>
                  <th>Project</th>
                </tr>
              </thead>
              <tbody>
                {expenditure.map((e, i) => (
                  <tr key={i}>
                    <td>{e.title}</td>
                    <td>{Intl.NumberFormat().format(e.amount)}</td>
                    <td>{e.count}</td>
                    <td>{e.project.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Page;
