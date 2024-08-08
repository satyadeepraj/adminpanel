import React from "react";

import PieChart from "./component/PieChart";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import { Loader } from "@/components/component/loader";

export default function Page10({ pageNumber,totalPages }) {
  const { id } = useParams();
  const { blogData, userSeverityCounts } = useData();

  let User;
  let severityCounts = { Critical: 0, High: 0, Medium: 0, Low: 0 };

  if (blogData && id) {
    console.log(id);
    User = blogData.find((e) => e._id == id);
    if (userSeverityCounts[id]) {
      severityCounts = userSeverityCounts[id];
    }
    console.log(User);
  }
  if (!blogData) {
    return (
      <div className=" px-96">
        <Loader />
      </div>
    );
  }

  if (!User) {
    return <div>User not found</div>;
  }
  const findingsData = [
    severityCounts.Critical,
    severityCounts.High,
    severityCounts.Medium,
    severityCounts.Low,
  ];

  const totalFindings = findingsData.reduce((total, num) => total + num, 0);

  return (
    <div className="page flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-xl font-bold text-blue-600 mb-6">
        6.1 Overall Finding Summary
      </h1>
      <div className="">
        <table className="table-auto w-full mb-8">
          <thead>
            <tr>
              <th className="px-4 py-2">Total Findings</th>
              <th className="px-4 py-2">Critical</th>
              <th className="px-4 py-2">High</th>
              <th className="px-4 py-2">Medium</th>
              <th className="px-4 py-2">Low</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border bg-blue-900 text-white px-4 py-2">
                {totalFindings}
              </td>
              <td className="border bg-[#FF0000] px-4 py-2">
                {severityCounts.Critical}
              </td>
              <td className="border bg-yellow-500 px-4 py-2">
                {severityCounts.High}
              </td>
              <td className="border bg-yellow-300 px-4 py-2">
                {severityCounts.Medium}
              </td>
              <td className="border bg-green-500 px-4 py-2">
                {severityCounts.Low}
              </td>
            </tr>
          </tbody>
        </table>
        <h1 className="text-xl flex items-center justify-center font-bold text-blue-600 mb-8">
          6.2 Overall Severity
        </h1>
        <PieChart data={findingsData} />
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">Confidential</p>
        <p className="text-sm text-gray-600">  Page {pageNumber} of {totalPages}</p>
      </div>
    </div>
  );
}
