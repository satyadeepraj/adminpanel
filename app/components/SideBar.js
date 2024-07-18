// Import necessary libraries and components
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";
import image from "../../public/loginpage/logo.png";
import HomeIcon from "../../public/sidebar/home.png";
import BoxIcon from "../../public/sidebar/box.png";
import ProductIcon from "../../public/sidebar/product.png";
import CustomerIcon from "../../public/sidebar/customer.png";
import ListIcon from "../../public/sidebar/list.gif"
import SignOutAltIcon from "../../public/sidebar/logout.png";
import Signout from "@/components/UserComponent/Signout";


// Sidebar component
const SideBar = () => {
  const router = useRouter();

  // Function to determine if a link is active
  const isLinkActive = (href) => {
    return router.pathname === href;
  };

  // // Handle logout functionality
  // const handleLogout = () => {
  //   // Remove the cookie
  //   Cookies.remove("jwt");

  //   // Redirect to the login page
  //   router.push("/");
  // };

  return (
    <div className="fixed h-screen w-64 mt-5 mobile:mt-0  bg-[#EBEBEB] shadow-xl mobile:shadow-none text-xs  font-bold flex flex-col items-center overflow-auto">
      {/* Sidebar Content */}

      <div className="w-full pt-6 mt-12 flex justify-left ml-16 space-y-6 ">
       
          <Link
            href="/"
            className={`hover:bg-white hover:rounded p-2  ${
              isLinkActive("/") && "bg-white"
            }`}
          >
            <span className="flex space-x-2">
              <Image
                alt=""
                src={HomeIcon}
                width={20}
                height={20}
                className={`mr-2 `}
              ></Image>
              <p
                className={`hover:text-gray-700 ${
                  isLinkActive("/") && "text-gray-700"
                }`}
              >
               Home
              </p>
            </span>
          </Link>
    
      </div>
     
     
      <div className="w-full flex justify-left ml-16">
        <Link
          href="/allBlogs"
          className={`hover:bg-white hover:rounded p-2 ${
            isLinkActive("/allBlogs") && "bg-white"
          }`}
        >
          <span className="flex space-x-2">
            <Image
              src={CustomerIcon}
              width={20}
              height={20}
              className="mr-2"
            ></Image>
            <p
              className={`hover:text-gray-700 ${
                isLinkActive("/allBlogs") && "text-gray-700"
              }`}
            >
              Reports
            </p>
          </span>
        </Link>
      </div>

      {/* <div className="w-full flex justify-left ml-16">
        <Link
          href="/report-list"
          className={`hover:bg-white hover:rounded p-2 ${
            isLinkActive("/report-list") && "bg-white"
          }`}
        >
          <span className="flex space-x-2">
            <Image
              src={ListIcon}
              width={20}
              height={20}
              className="mr-2"
            ></Image>
            <p
              className={`hover:text-gray-700 ${
                isLinkActive("/report-list") && "text-gray-700"
              }`}
            >
              Reports List
            </p>
          </span>
        </Link>
      </div> */}

      <div className="w-full flex justify-left ml-16">
        <Link
          href="/addProducts"
          className={`hover:bg-white hover:rounded p-2 ${
            isLinkActive("/products") && "bg-white"
          }`}
        >
          <span className="flex space-x-2">
            <Image
              src={ListIcon}
              width={20}
              height={20}
              className="mr-2"
            ></Image>
            <p
              className={`hover:text-gray-700 ${
                isLinkActive("/products") && "text-gray-700"
              }`}
            >
             Projects
            </p>
          </span>
        </Link>
      </div>
      <hr className="w-4/5 border-ts border-gray-400 my-3 font-extrabold" />
      {/* Logout Link */}
      <div className="w-full flex justify-left ml-16">
        <div
          className={`hover:bg-white hover:rounded p-2 cursor-pointer ${
            isLinkActive("/") && "bg-white"
          }`}
        
        >
          <span className="flex space-x-2">
            <Image
              src={SignOutAltIcon}
              width={20}
              height={20}
              className="mr-2"
            ></Image>
            <p
              className={`hover:text-gray-700 ${
                isLinkActive("/") && "text-gray-700"
              }`}
            >
              <Signout/>
            </p>
          </span>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className=" ">
        <p className="text-base font-semibold text-center text-black">
          Powered By:
        </p>
        <Image
          width={100}
          height={100}
          src={image}
          alt="Powered by Your Company"
          className="w-50 h-42 "
        />
      </div>
    </div>
  );
};

export default SideBar;
