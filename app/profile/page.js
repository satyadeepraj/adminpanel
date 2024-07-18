import React from "react";

import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { ToastContainer } from "react-toastify";
import ProfileMainComponent from "@/components/dashboardComponents/ProfileMainComponent";
const page = () => {
  return (
    <div>
      <div className=" min-h-screen w-full">
        <Header />
        <ToastContainer />
        <div className="flex flex-col sm:flex-row   max-w-full min-h-screen">
          <div className="w-[25%] mobile:hidden">
            <SideBar />
          </div>
          <div className="w-full mx-auto py-20 px-16">
          <ProfileMainComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
