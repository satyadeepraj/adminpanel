"use client";
import React, { useState } from "react";

import Image from "next/image";
import profileImage from "../../assets/ProfileImage.svg";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { useStore } from "@/store";
import Loader from "@/components/UserComponent/Loader";
import { Button } from "../ui/button";

const ClientProfile = () => {
  const { product } = useStore();

  if (product) {
    return (
      <div className="h-auto sm:min-h-[100dvh] p-4 w-full mobile:w-full mobile:h-full bg-black ">
        <h1 className="text-4xl text-center py-10 text-white hidden sm:block">Profile</h1>
        <div className="sm:hidden flex gap-4 items-center text-lg bg-blueDark text-black rounded-3xl p-4">
          <Link href={`/client/project/${product._id}`}>
            <ArrowButton />{" "}
          </Link>{" "}
          <h1> Company Profile</h1>
        </div>
        <div className=" flex lg:items-center justify-center gap-4 mt-4 flex-wrap sm:flex-nowrap">
          {/* First Div */}
          <div className="bg-white w-full sm:w-2/6 min-h-auto sm:max-h-[30rem] shadow-custom-lg rounded-3xl p-6 flex flex-col  gap-4 sm:gap-14 ">
            <div className="flex justify-center sm:justify-between items-center">
              <Image
                alt="profile-image"
                src={product.images[0]}
                className="border rounded-full"
                width={75}
                height={75}
              />
              {/* <Button
              variant="outline"
              className="text-orangeLight border-orangeLight rounded-full hover:text-orangeDark hidden sm:block"
            >
              Edit Now
            </Button> */}
            </div>
            <div className="flex flex-col gap-2  items-center sm:items-start">
              <h1 className="font-semibold text-lg">
                {product && product.companyName}
              </h1>
              <p className="text-base text-grayMedium">Noida, Uttar Pradesh</p>
              <div className="flex  flex-col text-grayMedium ">
                <span>Project Name :-{product && product.projectName} </span>
                <span>Project Id :- {product && product._id}</span>
              </div>
            </div>
          </div>

          {/* Second Div Start */}

          {/* *****************Personal Info Section******************* */}
        </div>
      </div>
    );
  } else {
    <Loader />;
  }
};

export default ClientProfile;

function ArrowButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      className="border-none rounded-full bg-[gray] hover:text-black bg-opacity-40"
    >
      <ChevronLeft className="h-6 w-6 text-white hover:text-black" />
    </Button>
  );
}
