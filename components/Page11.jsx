"use client";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import { Loader } from "@/components/component/loader";

import React from "react";

const Page11 = () => {
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
  const section = User.sections[0]; // Get only the first section

  const getSeverityBgColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500";
      case "High":
        return "bg-yellow-400";
      case "Medium":
        return "bg-yellow-300";
      case "Low":
        return "bg-green-500";
      default:
        return "";
    }
  };

  return (
    <div className=" flex flex-col items-start p-2 bg-white shadow-md rounded-lg ">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        7. Detailed Findings
      </h2>
      <h2 className="text-2xl font-bold text-blue-600  py-4 ml-4">
        7.1    {section.vulnerability || "Authentication Bypass"}
      </h2>
      <table className="table-auto w-full mb-8">
        <tbody>
        
          <tr>
            <td className="font-semibold px-4 py-2 flex flex-row gap-[22px]">
              Affected URL<span className="">:</span>
            </td>
            <td className="px-4 py-2">
              <a href="http://www.samplereport.com" className="text-blue-600">
                {User.email || "www.samplereport.com"}
              </a>
            </td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 flex flex-row gap-[61px]">
              Severity<span className="">:</span>
            </td>
            <td className="px-4 py-2 ">
              <span
                className={`${getSeverityBgColor(
                  section.severity
                )}  border-2 border-black text-white font-bold px-2 pb-4 rounded`}
              >
                {section.severity}
              </span>
            </td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 flex flex-row gap-[36px]">
              Description<span className="">:</span>
            </td>
            <td className="px-4 py-2 text-justify leading-relaxed">
              It is observed that application Authentication Bypass in Login
              Module.
            </td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 flex flex-row gap-[72px]">
              Impact<span className="">:</span>
            </td>
            <td className="px-4 py-2 text-justify leading-relaxed">
              An authentication process that can be bypassed is a serious risk
              for the application. An authentication bypass vulnerability
              removes access controls from the application and opens up the
              application to anonymous users (attackers). If the application is
              available externally, the number of potential users who could
              attack the application is significant. A failure in authentication
              controls can lead to significant data loss and a lack of control
              over sensitive operations.
            </td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 flex flex-row gap-[px]">
              Recommendation<span className="">:</span>
            </td>
            <td className="px-4 py-2 text-justify leading-relaxed">
              The input data should be validated for special characters both in
              value fields and in URL. It is mandatory to implement server-side
              validations for every input vector in the application i.e. GET as
              well as POST parameters. Use parameterized queries in the
              application so that all supplied parameters are treated as data,
              rather than potentially executable queries. Validation at the
              client side and server end is mandatory and application must trap
              all errors and give customized error messages to the user.
              <br />
              Note: - Fix it throughout the application.
            </td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2 flex flex-row gap-[38px]">
              Reference<span>:</span>
            </td>
            <td className="px-4 py-2">
              {section.images && section.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {section.images.map((item, index) => (
                    <div key={index} className="">
                      <img
                        src={item}
                        alt={`Reference ${index}`}
                        className=" border rounded mb-2"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No images available for this section</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Page11;
