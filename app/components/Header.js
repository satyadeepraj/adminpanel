"use client"
import Image from "next/image";
import React from "react";
import image from "../../public/loginpage/logo1.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./SideBar";
import { useStore } from "@/store";
import ProfileDropdown from "@/components/dashboardComponents/ProfileDropdown";

const Header = () => {
  const { user } = useStore();
  return (
    <header className="fixed mobile:w-full top-0 mobile:flex mobile:flex-row mobile:justify-between  border left-0 right-0 flex flex-col shadow-xl sm:flex-row justify-between items-center bg-gray-900 text-white border-b border-gray-200 text-sm py-3 px-4 sm:px-6 lg:px-8 w-full h-20 z-50">
      <Sheet className="sm-hidden">
        <SheetTrigger asChild>
          <Button
            className="lg:hidden ml-1 text-black "
            size="icon"
            variant="outline"
          >
            <MenuIcon className="h-6 w-6  " />
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-[#EBEBEB]" side="left">
          <div className="w-[25%]">
            <SideBar />
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex gap-2 items-center  ">
        <a className="" href="#" aria-label="Brand">
          <Image width={100} src={image} alt="User" className="w-[100px] h-28" />
        </a>
        {user && (
          <p className='hidden sm:block'>
            Welcome, <span className="font-medium ms-2 capitalize">{user.name}</span>
          </p>
        )}
      </div>
      <div className="relative group  ">
        <ProfileDropdown user={user} />
      </div>
    </header>
  );
};

export default Header;

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
