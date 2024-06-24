"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import { Loader } from "@/components/component/loader";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

const Page3 = () => {
  const { id } = useParams();
  const { blogData } = useData();

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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="page overflow-x-auto p-8">
      <p className="font-bold text-xl py-4">Document Details </p>
      <Table>
        <TableHeader className="bg-blue-900 text-white">
          <TableRow>
            <TableHead className="px-4 py-3">Item</TableHead>
            <TableHead className="px-4 py-3">Description</TableHead>
            <TableHead className="px-4 py-3"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="px-4 py-3 border-r border-l border-black dark:border-black">
              Document Type
            </TableCell>
            <TableCell className="px-4 py-3   border-black dark:border-black">
              {User.documentype}{" "}
            </TableCell>
            <TableCell className="px-4 py-3 font-medium text-red-500 border-r border-black dark:border-black"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 border-r border-l border-b border-t border-black dark:border-black">
              Document Version{" "}
            </TableCell>
            <TableCell className="px-4 py-3  border-t border-b border-black dark:border-black">
              {User.documentversion}{" "}
            </TableCell>
            <TableCell className="px-4 py-3 font-medium text-orange-500 border-r border-t border-b border-black dark:border-black"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p className="font-bold text-xl py-4">Authors</p>
      <Table>
        <TableHeader className="bg-blue-900 text-white">
          <TableRow>
            <TableHead className="px-4 py-3">Prepared By</TableHead>
            <TableHead className="px-4 py-3"></TableHead>
            <TableHead className="px-4 py-3"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="px-4 py-3 font-bold border-r border-l border-black dark:border-black">
              Name
            </TableCell>
            <TableCell className="px-4 py-3 font-bold border-r  border-black dark:border-black">
              Test Starting Date
            </TableCell>
            <TableCell className="px-4 py-3 font-bold border-r border-black dark:border-black">
              Test completion Date
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 border-r border-l border-t border-black dark:border-black">
              {User.author[0].preparedby}{" "}
            </TableCell>
            <TableCell className="px-4 py-3 border-r border-t border-b border-black dark:border-black">
              {formatDate(User.author[0].dateOfTesting)}{" "}
            </TableCell>
            <TableCell className="px-4 py-3  border-r border-t border-b border-black dark:border-black">
              {formatDate(User.author[0].dateOfTestingCompletion)}{" "}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3  border-l border-b border-t border-black dark:border-black"></TableCell>
            <TableCell className="px-4 py-3  border-b border-black dark:border-black"></TableCell>
            <TableCell className="px-4 py-3 font-medium text-green-500 border-r border-b border-black dark:border-black"></TableCell>
          </TableRow>
          <TableRow className="bg-blue-900 text-white hover:bg-black">
            <TableCell className="px-4 py-3  border-l border-b border-t border-black dark:border-black">
              Reviewed & Approved By{" "}
            </TableCell>
            <TableCell className="px-4 py-3  border-b border-black dark:border-black"></TableCell>
            <TableCell className="px-4 py-3 font-medium text-green-500 border-r border-b border-black dark:border-black"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 font-bold border-r border-l border-black dark:border-black">
              Name
            </TableCell>
            <TableCell className="px-4 py-3 font-bold   border-black dark:border-black">
              Date Of Approval
            </TableCell>
            <TableCell className="px-4 py-3 font-bold border-r border-black dark:border-black"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-4 py-3 border-r border-l border-t border-b border-black dark:border-black">
              {User.author[0].approvedby}{" "}
            </TableCell>
            <TableCell className="px-4 py-3  border-t border-b border-black dark:border-black">
              {formatDate(User.author[0].dateOfApproval)}{" "}
            </TableCell>
            <TableCell className="px-4 py-3  border-r border-t border-b border-black dark:border-black">
              {" "}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Page3;
