"use client";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import { Loader } from "@/components/component/loader";

import React from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

const Page8 = ({ pageNumber,totalPages }) => {
  const { id } = useParams();
  const { blogData } = useData();
  const options = { month: "long", day: "numeric", year: "numeric" };
  let User;

  if (blogData && id) {
    console.log(id);
    User = blogData.find((e) => e._id == id);
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

  const getSeverityBgColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500';
      case 'High':
        return 'bg-yellow-400';
      case 'Medium':
        return 'bg-yellow-300';
      case 'Low':
        return 'bg-green-500';
      default:
        return '';
    }
  };

  return (
    <div className="page overflow-x-auto p-8">
      <h1 className="text-xl font-bold text-blue-600 mb-2">
        6. Finding Summary
      </h1>
      <Table>
        <TableHeader className="bg-blue-900 text-white ">
          <TableRow>
            <TableHead className="px-4 py-3">Target URL</TableHead>
            <TableHead className="px-4 py-3">Vulnerability</TableHead>
            <TableHead className="px-4 py-3">Severity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {User &&
            User.sections.map((section, index) => (
              <>
                <TableRow key={index}>
                  <TableCell className="px-4 py-3 border-r border-b border-l border-black dark:border-black">
                  {User.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 border-r border-b  border-black dark:border-black">
                   {section.vulnerability}
                  </TableCell>
                  <TableCell className={`px-4 py-3 border-b font-medium text-black border-r border-black dark:border-black ${getSeverityBgColor(section.severity)}`}>
                    {section.severity}
                  </TableCell>
                </TableRow>
              
              </>
            ))}
        </TableBody>
      </Table>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">Confidential</p>
        <p className="text-sm text-gray-600">  Page {pageNumber} of {totalPages}</p>
      </div>
    </div>
  );
};

export default Page8;
