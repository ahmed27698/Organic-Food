"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import dynamic from "next/dynamic";

const data = [
  { name: "Jan", sales: 10 },
  { name: "Feb", sales: 20 },
  { name: "Mar", sales: 30 },
  { name: "Apr", sales: 40 },
  { name: "May", sales: 50 },
  { name: "Jun", sales: 55 },
];

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SalesChart() { 
  const series = [
    {
      name: "Sales",
      data: [30, 50, 80, 40, 90, 120],
    },
  ];

  const options = {
    chart: { id: "basic-bar" },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    stroke: { curve: "smooth" },
    colors: ["#4f46e5"],
  };

  return (
    <div className="flex flex-wrap justify-between ">
      <LineChart width={500} className="mt-15" height={400} data={data}>
        <Line dataKey="sales" stroke="#8884d8" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>

      <ApexChart className="w-1/2" options={options} series={series} type="bar" height={500}  />
    </div>
  );
}
