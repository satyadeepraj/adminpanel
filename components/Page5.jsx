// pages/report.js

import Image from 'next/image';
import MethodologyImage from '../public/loginpage/demo-banner.jpg'; // Ensure you have this image in the public directory

const Page5 = () => {
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
                <td className="border px-4 py-2">www.samplereport.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Methodology */}
      <div>
        <h1 className="text-xl font-bold text-blue-600">3. Methodology</h1>
        <div className="mt-4 flex justify-center">
          <Image className='h-[350px]' src={MethodologyImage} alt="Web Application Security Testing Methodology" />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">Confidential</p>
        <p className="text-sm text-gray-600">Page 5 of 40</p>
      </div>
    </div>
  );
};

export default Page5;
