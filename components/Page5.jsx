"use client";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import { Loader } from "@/components/component/loader";
import Image from 'next/image';
import MethodologyImage from '../public/loginpage/Methodology.jpeg'; // Ensure you have this image in the public directory

const Page5 = ({ pageNumber,totalPages }) => {
  const { id } = useParams();
  const { blogData } = useData();
  const options = { month: "long", day: "numeric", year: "numeric" };
  let User = null;

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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-4">User not found</h1>
      </div>
    );
  }
  return (
    <div className="p-8 page">
      {/* Header */}
      <div className="border-b-2 pb-4 mb-4">
        <h1 className="text-xl font-bold text-blue-600">1. Introduction</h1>
        <p className="mt-2">
          This document summarizes the results of Vulnerability / Penetration tests conducted on the complete web application.
        </p>
      </div>

      {/* Scope */}
      <div className="border-b-2 pb-4 mb-4">
        <h1 className="text-xl font-bold text-blue-600">2. Scope</h1>
        <p className="mt-2">
          The aim of this project was to conduct the following activities:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Gather Information</li>
          <li>Enumerate the network</li>
          <li>Establish Vulnerabilities</li>
          <li>Reporting details based on the information gathered</li>
        </ul>
        <div className="mt-4">
          <h2 className="font-bold">Web Application Details:</h2>
          <table className="table-auto mt-2 w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className=" py-2">S No.</th>
                <th className="py-2">Application URL</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="border px-4 py-2">1</td>
                <td className="border px-4 py-2">{User.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Methodology */}
      <div>
        <h1 className="text-xl font-bold text-blue-600">3. Methodology</h1>
        <div className="mt-4 flex justify-center">
          <Image className='w-[90%] h-[350px]' src={MethodologyImage} alt="Web Application Security Testing Methodology" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">Confidential</p>
        <p className="text-sm text-gray-600">  Page {pageNumber} of {totalPages}</p>
      </div>
    </div>
  );
};

export default Page5;
