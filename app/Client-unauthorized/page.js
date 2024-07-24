"use client";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-gray-400 h-screen flex items-center justify-center text-center">
      <div className="py-20">
        <h1>Unauthorized</h1>
        <p className="py-8"> You do not have permission to view Client page.</p>
        <Button>
          <Link className=" bg-black text-white" href={`/`}>
            <div className="flex items-center gap-2">
              {" "}
              <span>
                <img src="/Backarrow.png" className="w-6 h-6" />
              </span>{" "}
              Back to Home Page
            </div>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
