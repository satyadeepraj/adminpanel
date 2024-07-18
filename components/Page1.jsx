"use client";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import { Loader } from "@/components/component/loader";

import React from "react";
import Image from "next/image";

const Page1 = () => {
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
    <div className="page flex flex-col items-center justify-center min-h-screen bg-white border-8 border-black pl-[100px] pr-[100px] pt-[80px] pb-[50px]">
      <div className="mb-8">
        <Image
          className="h-[180px] w-[160px]"
          src="/Company-logo.jpeg"
          alt="Logo"
          width={100}
          height={100}
        />
      </div>
      <h1 className="text-3xl font-bold text-center mb-4">
        Web Application Security Testing Report
      </h1>
      <h2 className="text-xl text-center mb-4">of</h2>
      <h2 className="text-xl font-bold text-center mb-4">{User.email}</h2>
      <p className="text-center mb-8">
        {" "}
        {new Date(User.dateOfReport).toLocaleDateString("en-GB", options)}
      </p>
      <p className="text-xl font-bold">A2DGC (P) Ltd.</p>
      <div className="pt-[350px] text-center">
        <p className="text-sm text-gray-600"></p>
        <p className="text-sm text-gray-600"></p>
      </div>
    </div>
  );
};

export default Page1;
