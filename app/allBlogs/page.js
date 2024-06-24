import React from "react";
import Allblogs from "./Allblogs";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { ToastContainer } from "react-toastify";
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
          <Allblogs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
