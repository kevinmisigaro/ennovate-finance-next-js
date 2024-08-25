import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { ChartData } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const  OverviewExpenditureChart = ({
  salesdata,
  saleslabels,
}: {
  salesdata: any[];
  saleslabels: any[];
}) => {
  // Define the data for the bar chart
  const data: ChartData<"bar"> = {
    labels: saleslabels,
    datasets: [
      {
        label: "Expenditures",
        data: salesdata, // Example data
        backgroundColor: "rgb(104, 104, 104, 0.9)", // Bar color
        borderColor: "rgb(104, 104, 104, 1)", // Border color
        borderWidth: 1, // Border width
      },
    ],
  };

  // Define the options for the bar chart
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Type assertion to keep TypeScript happy
      },
      title: {
        display: true,
        text: "Monthly Expenditures",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default OverviewExpenditureChart;
