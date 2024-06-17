"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { httpRequest } from "@/utils/http";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [values, setValues] = useState({
    projectsCount: 0,
    expenditureSum: 0,
    incomeSum: 0,
  });

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const response = await httpRequest("GET", "/dashboard");

      if (response) {
        setLoading(false);
        setValues({
          projectsCount: response.projects,
          expenditureSum: response.expenditures,
          incomeSum: response.incomes,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <DashboardLayout>
      <div>
        {loading ? (
          <div className="flex flex-row items-center justify-center">
            <FadeLoader color="#ffbb00" />
          </div>
        ) : (
          <div className="stats shadow flex flex-row gap-x-3">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Projects</div>
              <div className="stat-value">{values.projectsCount}</div>
              {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Expenditure Amount</div>
              <div className="stat-value">
                {Intl.NumberFormat().format(values.expenditureSum)}
              </div>
              {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Income Amount</div>
              <div className="stat-value">
                {Intl.NumberFormat().format(values.incomeSum)}
              </div>
              {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Page;
