import React from "react";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import { Loader } from "@/components/component/loader";

const Page4 = ({ pageNumber, totalPages }) => {
  const { id } = useParams();
  const { blogData } = useData();

  let User = null;

  if (blogData && id) {
    User = blogData.find((e) => e._id == id);
  }

  if (!blogData) {
    return (
      <div className="px-96">
        <Loader />
      </div>
    );
  }

  if (!User) {
    return <div>User not found</div>;
  }

  const items = [
    { srno: 1, title: "Introduction", page: 5 },
    { title: "Scope", page: 5 },
    { title: "Methodology", page: 5 },
    { title: "Standards", page: 6 },
    { title: "Ratings", page: 7 },
    { title: "Finding Summary", page: 8 },
  ];

  return (
    <div className="p-4 page">
      <h1 className="text-center text-2xl font-bold mb-4">Table of Contents</h1>
      <table className="w-full text-sm">
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-1">
                <span>{index + 1}.</span>
                {item.title && <span className="ml-6">{item.title}</span>}
                {item.subtitle1 && (
                  <span className="ml-6">{item.subtitle1}</span>
                )}
                {item.subtitle2 && (
                  <span className="ml-6">{item.subtitle2}</span>
                )}
              </td>
              <td className="py-1 text-right">{item.page}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-full text-sm">
        <tbody>
          <tr className="border-b">
            <td className="py-1">
              <span>6.1</span>
              <span className="ml-6"> Overall Finding Summary</span>
            </td>
            <td className="py-1 text-right">9</td>
          </tr>
          <tr className="border-b">
            <td className="py-1">
              <span>6.2</span>
              <span className="ml-6"> Overall Finding Summary</span>
            </td>
            <td className="py-1 text-right">9</td>
          </tr>
          <tr className="border-b flex justify-between">
            <td className="py-1">
              <span>7.</span>
              <span className="ml-6">Detailed Findings</span>
            </td>
          </tr>
        </tbody>
      </table>
      {User.sections && User.sections.length > 0 ? (
        <table className="w-full text-sm ">
          <tbody>
            {User.sections.map((section, index) => (
              <tr key={index} className="border-b">
                <td className="py-1">
                  <span>7.{index + 1}</span>
                  <span className="ml-6">
                    {section.vulnerability || "No Vulnerability"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No sections available</div>
      )}
       <table className="w-full text-sm">
        <tbody>
          <tr className="border-b">
            <td className="py-1">
              <span>8.0</span>
              <span className="ml-6"> Conclusion</span>
            </td>
          
          </tr>
          <tr className="border-b">
            <td className="py-1">
              <span>8.1</span>
              <span className="ml-6"> Use of Payloads and Exploitation</span>
            </td>
           
          </tr>
          <tr className="border-b">
            <td className="py-1">
              <span>9.0</span>
              <span className="ml-6"> Tools Used</span>
            </td>
           
          </tr>
          {/* <tr className="border-b flex justify-between">
            <td className="py-1">
              <span>7.</span>
              <span className="ml-6">Detailed Findings</span>
            </td>
          </tr> */}
        </tbody>
      </table>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">Confidential</p>
        <p className="text-sm text-gray-600">
          Page {pageNumber} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default Page4;
