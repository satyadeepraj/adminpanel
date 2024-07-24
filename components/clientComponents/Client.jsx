"use client";
import * as React from "react";
import { ClientCard } from "@/components/clientComponents/ClientCard";
import { useStore } from "@/store";
import ClientHeader from "./ClientHeader";

export function Client() {
  const { product } = useStore();

  return (
    <div className="">
        <div className="relative z-10"><ClientHeader/></div>
      <div className="absolute inset-0 z-0">
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source
            src="https://res.cloudinary.com/dzkpb9csm/video/upload/v1721588931/HISPL/1154-143492926_tiny_fpxf7y.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    
      <div className="relative z-10 mt-10 bg-white shadow-md w-1/2 mx-auto rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-pink-300 h-24 text-4xl text-white font-semibold flex items-center justify-center px-4">
          Project
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2"></h2>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="text-gray-400"> Start Date :- </span>
              <span className=" text-xl font-bold text-black">
                {new Date(product.startDate).toLocaleDateString("en-GB")}
              </span>
            </div>
            <div>
              <span className="text-gray-400">End Date :- </span>
              <span className="text-xl font-bold text-black">
                {new Date(product.endDate).toLocaleDateString("en-GB")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <ClientCard
          key={product.id}
          companyName={product.companyName}
          projectName={product.projectName}
          images={product.images[0]}
        />
      </div>
      
    </div>
  );
}
