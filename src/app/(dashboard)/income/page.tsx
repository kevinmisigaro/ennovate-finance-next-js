"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { httpRequest } from "@/utils/http";
import { Income } from "@/utils/interfaces";
import { useEffect, useState } from "react";
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
        ) : income.length == 0 ? (
          <div className="text-center text-xl">
            <h3>No income currently</h3>
          </div>
        ) : (
          <div>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Project</th>
                </tr>
              </thead>
              <tbody>
                {income.map((e, i) => (
                  <tr key={i}>
                    <td>{e.title}</td>
                    <td>{Intl.NumberFormat().format(e.amount)}</td>
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
