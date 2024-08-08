"use client";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import { Loader } from "@/components/component/loader";
import staticData from "./StaticData";
import React from "react";

const Page11 = ({ pageNumber, totalPages }) => {
  const { id } = useParams();
  const { blogData, vulnerabilityData } = useData();

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
    return <div>User not found</div>;
  }

  const getSeverityBgColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500";
      case "High":
        return "bg-yellow-500";
      case "Medium":
        return "bg-yellow-300";
      case "Low":
        return "bg-green-500";
      default:
        return "";
    }
  };
  // Sort sections by severity order
  const severityOrder = ["Critical", "High", "Medium", "Low"];
  const sortedSections = (User.sections || []).sort((a, b) => {
    return (
      severityOrder.indexOf(a.severity) - severityOrder.indexOf(b.severity)
    );
  });

  return (
    <div className=" flex flex-col items-start p-2 bg-white shadow-md rounded-lg ">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        7. Detailed Findings
      </h2>
      {sortedSections.length > 0 ? (
        sortedSections.map((section, index) => {
          const staticVulnerabilityData =
            staticData[section.vulnerability] || {};
          const matchingVulnerability =
            vulnerabilityData?.find(
              (vul) => vul.vulnerabilityName === section.vulnerability
            ) || {};
          const vulnerabilityContent = matchingVulnerability.description
            ? matchingVulnerability
            : staticVulnerabilityData;
          const currentPage = pageNumber + index;

          return (
            <div key={index} className="page-break-after">
              <h2 className="text-2xl font-bold text-blue-600 py-4 ml-4">
                7.{index + 1} {section.vulnerability || "No Vulnerability"}
              </h2>
              <table className="table-auto w-full">
                <tbody>
                  <tr>
                    <td className="font-semibold px-4 py-2 flex flex-row gap-[22px]">
                      Affected URL<span className="">:</span>
                    </td>
                    <td className="px-4 py-2">
                      <a
                        href="http://www.samplereport.com"
                        className="text-blue-600"
                      >
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
                        )} border-2 border-black text-black font-bold px-2 pb-4 rounded`}
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
                      {vulnerabilityContent.description ||
                        "No description available."}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold px-4 py-2 flex flex-row gap-[72px]">
                      Impact<span className="">:</span>
                    </td>
                    <td className="px-4 py-2 text-justify leading-relaxed">
                      {vulnerabilityContent.impact ||
                        "No impact information available."}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold px-4 py-2 flex flex-row gap-[px]">
                      Recommendation<span className="">:</span>
                    </td>
                    <td className="px-4 py-2 text-justify leading-relaxed">
                      {vulnerabilityContent.recommendation ||
                        "No recommendation available."}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold px-4 py-2 flex flex-row gap-[38px]">
                      Reference<span>:</span>
                    </td>
                    <td className="px-4 py-2">
                      <p className="mb-2">
                        Note:- Fix it throughout the application.
                      </p>
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
              <div className="text-right flex flex-col font-semibold">
                <span>confidential</span>
                Page {currentPage}
              </div>
            </div>
          );
        })
      ) : (
        <div>No sections available</div>
      )}
    </div>
  );
};

export default Page11;
