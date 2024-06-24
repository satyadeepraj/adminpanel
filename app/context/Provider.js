"use client";
import React from "react";
import { UserProvider } from "./UserContext/UserContext";
import { DataProvider } from "@/context/DataContext";

const Provider = ({ children }) => {
  return (
    <>
      <UserProvider>
      <DataProvider>{children}</DataProvider>
      </UserProvider>
    </>
  );
};

export default Provider;
