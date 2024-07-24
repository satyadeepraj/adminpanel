"use client";
import Image from "next/image";
import React from "react";
import image from "../../public/loginpage/logo1.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useStore } from "@/store";
import ProfileDropdown from "../dashboardComponents/ProfileDropdown";
import ClientDropdown from "./ClientDropdown";
import { ClientSheet } from "./ClientSheet";


const ClientHeader = () => {
  const { product } = useStore();
  return (
    <header className=" flex flex-row items-center justify-between px-4 py-4 mobile:px-0  mobile:w-full mobile:flex mobile:items-center mobile:justify-between">
      <div className="lg:hidden mobile:ml-2">
        <ClientSheet />
      </div>
      <div className="flex gap-2 items-center  ">
        <a className="" href={`/client/project/${product._id}`} aria-label="Brand">
          <img
            src={
              product.images?.[0] ||
              "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
            }
            alt="Company Logo"
            className="h-9 w-9 rounded-full object-cover"
          />
        </a>
        {product && (
          <p className="hidden text-2xl ml-2 sm:block">
            Welcome,{" "}
            <span className="font-bold text-black ms-2 capitalize tracking-widest">
              {product.companyName}
            </span>
          </p>
        )}
      </div>
      <div className="relative group  ">
        <ClientDropdown product={product} />
      </div>
    </header>
  );
};

export default ClientHeader;

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
