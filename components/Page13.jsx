"use client";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import { Loader } from "@/components/component/loader";

import React from "react";

const Page13 = () => {
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

  return (
    <div className="page-break-after p-2  ">

        <div className="mb-8">
          <h2 className="text-xl text-blue-500 font-semibold">8.0 Conclusion</h2>
          <p className="mt-2">
            The above app tested shows vulnerabilities which include{" "}
            <span className="font-bold">
              Critical, High, Medium, and Low vulnerabilities
            </span>
            .
          </p>
          <p className="mt-2">
            Hence, the <span className="font-bold text-blue-500"> Client XXX YYY, India </span> team needs to
            work on strengthening its ULRs by implementing the remediation
            actions provided above.
          </p>
        </div>
        <div>
          <h2 className="text-xl text-blue-500 font-semibold">
            9.0 Use of Payloads and Exploitation
          </h2>
          <ul className="list-disc list-inside mt-2">
            <li>
            Metasploit Payloads: Yes 
            </li>
            <li>
            	Custom exploiting payloads used: Yes 
            </li>
          </ul>
        </div>
   
    </div>
  );
};

export default Page13;
