import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Signout from "../UserComponent/Signout";



const ProfileDropdown = ({ user }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none ">
          <div className="flex sm:gap-4 sm:items-center bg-[white] text-black rounded-full p-2 me-10 sm:me-0 sm:shadow-custom-lg ">
            <ProfileIcon />
            <span className="hidden sm:block capitalize">{user.name}</span>
            <DownArrow />
          </div>
          
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Signout/>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileDropdown;

function ProfileIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        viewBox="0 0 34 34"
      >
        <g
          id="Group_359"
          data-name="Group 359"
          transform="translate(-1745 -23)"
        >
          <circle
            id="Ellipse_1"
            data-name="Ellipse 1"
            cx="17"
            cy="17"
            r="17"
            transform="translate(1745 23)"
            fill="#121839"
          />
          <path
            id="Intersection_1"
            data-name="Intersection 1"
            d="M4.2,28.183a15,15,0,0,1,25.609,0,17,17,0,0,1-25.609,0Z"
            transform="translate(1745 23)"
            fill="#fff"
          />
          <circle
            id="Ellipse_2"
            data-name="Ellipse 2"
            cx="7"
            cy="7"
            r="7"
            transform="translate(1755 28)"
            fill="#fff"
          />
        </g>
      </svg>
    </>
  );
}

function DownArrow() {
  return (
    <div className="hidden sm:block">
      <svg
        fill="#000000"
        width="10"
        height="10"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z" />
      </svg>
    </div>
  );
}
