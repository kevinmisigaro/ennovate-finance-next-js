"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { httpRequest } from "@/utils/http";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import { FaBriefcase, FaMoneyBill, FaPiggyBank } from "react-icons/fa";
import { useSingleProject } from "@/utils/store/SingleProjectContext";
import OverviewBarChart from "@/components/OverviewBarChart";
import OverviewExpenditureChart from "@/components/OverviewExpenditureChart";

function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const { projectId } = useSingleProject();
  const [values, setValues] = useState({
    projectsCount: 0,
    expenditureSum: 0,
    incomeSum: 0,
    salesData: [],
    salesLabels: [],
    expenditureData: [],
    expenditureLabels: [],
  });

  const fetchSingleDashboard = async () => {
    setLoading(true);
    try {
      const response = await httpRequest(
        "GET",
        `/dashboard/project/${projectId}`
      );

      if (response) {
        setLoading(false);
        setValues({
          projectsCount: response.projects,
          expenditureSum: response.expenditures,
          incomeSum: response.incomes,
          salesData: [],
          salesLabels: [],
          expenditureData: [],
          expenditureLabels: [],
        });
        console.log(response.incomes);
      }
    } catch (error) {}
  };

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const response = await httpRequest("GET", "/dashboard");

      console.log(response);

      if (response) {
        setLoading(false);
        setValues({
          projectsCount: response.projects,
          expenditureSum: response.expenditures,
          incomeSum: response.incomes,
          salesData: response.salesdata,
          salesLabels: response.saleslabels,
          expenditureData: response.expendituredata,
          expenditureLabels: response.expenditurelabels,
        });
        console.log(response.projects);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (localStorage.getItem("projectId") == "0") {
      fetchDashboard();
    } else {
      fetchSingleDashboard();
    }
  }, [projectId]);

  return (
    <DashboardLayout>
      <div className="text-2xl mb-8 font-bold">Overview</div>
      <div>
        {loading ? (
          <div className="flex flex-row items-center justify-center">
            <FadeLoader color="#ffbb00" />
          </div>
        ) : (
          <div>
            <div className="stats shadow flex flex-row gap-x-3">
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <FaBriefcase className="text-2xl" />
                </div>
                <div className="stat-title">Projects</div>
                <div className="stat-value">{values.projectsCount}</div>
                {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <FaMoneyBill className="text-2xl" />
                </div>
                <div className="stat-title">Expenditure Amount</div>
                <div className="stat-value">
                  {Intl.NumberFormat().format(values.expenditureSum)}
                </div>
                {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <FaPiggyBank className="text-2xl" />
                </div>
                <div className="stat-title">Income Amount</div>
                <div className="stat-value">
                  {Intl.NumberFormat().format(values.incomeSum)}
                </div>
                {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
              </div>
            </div>

            <div className="mt-10">
              <OverviewBarChart
                salesdata={values.salesData}
                saleslabels={values.salesLabels}
              />
            </div>

            <div className="mt-10">
              <OverviewExpenditureChart
                salesdata={values.expenditureData}
                saleslabels={values.expenditureLabels}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Page;
