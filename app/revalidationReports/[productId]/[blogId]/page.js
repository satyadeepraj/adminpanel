'use client'
import React from "react";

import Header from "@/app/components/Header";
import SideBar from "@/app/components/SideBar";
import { ToastContainer } from "react-toastify";
import { EditRevalidationReports } from "./EditRevalidationReports";





const page = () => {
  return (
    <div>
      <div className="min-h-screen w-full">
        <Header />
        <ToastContainer />
        <div className="flex  flex-col sm:flex-row   max-w-full min-h-screen">
          <div className="w-[25%] mobile:hidden">
            <SideBar />
          </div>
          <div className="w-[60%] mt-24 mx-auto">
          <EditRevalidationReports/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;