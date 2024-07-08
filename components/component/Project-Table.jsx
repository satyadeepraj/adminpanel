"use client";
import Header from "@/app/components/Header";
import SideBar from "@/app/components/SideBar";
import { useData } from "@/context/DataContext";
import DeleteIcon from "../../public/DeleteIcon.gif";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { AddProduct } from "./add-product";
import { PencilIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";

const Projectable = () => {
  const { productData } = useData();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState("projectName");
  const [sortOrder, setSortOrder] = useState("asc");
  const productsPerPage = 6;

  // Sorting function
  const sortProducts = (products) => {
    return products.sort((a, b) => {
      const valueA = a[sortCriteria]?.toLowerCase() || "";
      const valueB = b[sortCriteria]?.toLowerCase() || "";
      if (sortOrder === "asc") {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });
  };

  // Filter and paginate products based on search query
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = (productData || []).filter((product) => {
    const companyName =
      product.companyName && product.companyName.toLowerCase();
    const projectName =
      product.projectName && product.projectName.toLowerCase();
    const productStartDate = new Date(product.startDate); // Assuming product.startDate is a valid date string
    const productEndDate = new Date(product.endDate); // Assuming product.endDate is a valid date string

    const isExactDateRange =
      (!startDate ||
        productStartDate.toDateString() === startDate.toDateString()) &&
      (!endDate || productEndDate.toDateString() === endDate.toDateString());

    const matchesSearchQuery =
      (companyName && companyName.includes(searchQuery.toLowerCase())) ||
      (projectName && projectName.includes(searchQuery.toLowerCase()));

    return matchesSearchQuery && isExactDateRange;
  });

  const currentProducts = sortProducts(filteredProducts).slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleDeleteProduct = async (productId) => {
    // Implement your delete logic here
    console.log(`Delete product with ID: ${productId}`);

    try {
      await axios.delete(`/api/product/${productId}`);
      toast.success("Product deleted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("Error publishing product. Please try again.");
      console.log(error);
    }
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleSortChange = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };
  return (
    <div className=" min-h-screen w-full bg-[#F1F1F1]">
      <Header />
      <div className="flex bg-[#F1F1F1] flex-col sm:flex-row   max-w-full min-h-screen">
        <div className="w-[25%] mobile:hidden">
          <SideBar />
        </div>
        <div className="p-7 w-[100%] mobile:w-[100%]  mt-12 flex flex-col  text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <div className=" mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
            <div className="flex items-center justify-between gap-8 mb-8">
              <div>
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Projects
                </h5>
                <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  See information about all reports
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                <div className="w-full md:w-72">
                  <div className="relative h-10 w-full min-w-[200px]">
                    <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Search
                    </label>
                  </div>
                </div>
                <button
                  className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  view all
                </button>

                <AddProduct />
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="block w-full overflow-hidden md:w-max">
                <nav>
                  <ul
                    role="tablist"
                    className="relative flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60"
                  >
                    <li
                      role="tab"
                      className="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                      data-value="all"
                    >
                      <div className="z-20 text-inherit">
                        &nbsp;&nbsp;All&nbsp;&nbsp;
                      </div>
                      <div className="absolute inset-0 z-10 h-full bg-white rounded-md shadow"></div>
                    </li>
                    <li
                      role="tab"
                      className="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                      data-value="monitored"
                    >
                      <div className="z-20 text-inherit">
                        &nbsp;&nbsp;Monitored&nbsp;&nbsp;
                      </div>
                    </li>
                    <li
                      role="tab"
                      className="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                      data-value="unmonitored"
                    >
                      <div className="z-20 text-inherit">
                        &nbsp;&nbsp;Unmonitored&nbsp;&nbsp;
                      </div>
                    </li>
                  </ul>
                </nav>
                <div className="flex items-center justify-center gap-4">
                  <button
                    className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => handleSortChange("companyName")}
                  >
                    Sort by Company Name
                  </button>
                  <button
                    className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => handleSortChange("projectName")}
                  >
                    Sort by Project Name
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <div>
                  <label></label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    isClearable
                    placeholderText="Start Date"
                    className="border rounded p-2"
                  />
                </div>
                <div>
                  <label></label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    isClearable
                    placeholderText="End Date"
                    className="border rounded p-2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 px-0 overflow-scroll">
            <table className="w-full mt-4 text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <div className="flex items-center gap-1 ">
                      <button
                        className="flex items-center gap-1"
                        onClick={() => handleSortChange("companyName")}
                      >
                        Company Name
                        {sortCriteria === "companyName" &&
                          sortOrder === "asc" && (
                            <FaSortAlphaDown className="text-gray-500" />
                          )}
                        {sortCriteria === "companyName" &&
                          sortOrder === "desc" && (
                            <FaSortAlphaUp className="text-gray-500" />
                          )}
                      </button>
                      {sortCriteria === "companyName" && ( // Render clear sort button only if sort criteria is set
                        <button
                          className="flex items-center gap-1 text-gray-500"
                          onClick={() => handleSortChange("")}
                        >
                          <AiOutlineClose className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </th>
                  <th className="flex items-center gap-1 p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <button
                      className="flex items-center gap-1 text-left"
                      onClick={() => handleSortChange("projectName")}
                    >
                      Project Name
                      {sortCriteria === "projectName" &&
                        sortOrder === "asc" && (
                          <FaSortAlphaDown className="text-gray-500" />
                        )}
                      {sortCriteria === "projectName" &&
                        sortOrder === "desc" && (
                          <FaSortAlphaUp className="text-gray-500" />
                        )}
                    </button>
                    {sortCriteria === "projectName" && ( // Render clear sort button only if sort criteria is set
                      <button
                        className="flex items-center gap-1 text-gray-500"
                        onClick={() => handleSortChange("")}
                      >
                        <AiOutlineClose className="h-4 w-4" />
                      </button>
                    )}
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Scope URL
                    </p>
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Type
                    </p>
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Start Date
                    </p>
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      End Date
                    </p>
                  </th>
                  <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentProducts && currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <tr
                      key={product._id}
                      id={product._id}
                      className="text-left border-b border-gray-300"
                    >
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              product.images?.[0] ||
                              "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                            }
                            alt="Company Logo"
                            className="h-9 w-9 rounded-full object-cover"
                          />
                          <div className="flex flex-col">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"></p>
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
                              {product.companyName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex flex-col">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {product.projectName}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="w-max">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {product.scopeUrl}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {product.type}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {new Date(product.startDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {new Date(product.endDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </p>
                      </td>
                      <td className="p-4 flex border-b border-blue-gray-50">
                        <PencilIcon
                          id={product._id}
                          className="ml-1 text-black-500 cursor-pointer hover:bg-gray-300 p-1 rounded"
                          onClick={() =>
                            router.replace(`/editprojects/${product._id}`)
                          }
                        ></PencilIcon>
                        <Link
                          href={`/report-list/${product._id}`}
                          classNameName="ml-1 text-gray-500 cursor-pointer hover:bg-gray-300 p-1 rounded"
                          type="button"
                          className="block"
                          data-hs-overlay="#hs-ai-invoice-modal"
                        >
                          <span className="px-6 py-1.5">
                            <span className="py-1 px-2 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                              <svg
                                className="flex-shrink-0 size-4"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
                                <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                              </svg>
                              View
                            </span>
                          </span>
                        </Link>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button>
                              <Image
                                src={DeleteIcon}
                                width={30}
                                height={20}
                                className="ml-2"
                              ></Image>
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your Product and remove data
                                from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProduct(product._id)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                      {/* <td className="size-px whitespace-nowrap">
                  <button type="button" className="block" data-hs-overlay="#hs-ai-invoice-modal">
                    <span className="px-6 py-1.5">
                      <span className="py-1 px-2 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"/>
                          <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        View
                      </span>
                    </span>
                  </button>
                </td> */}
                    </tr>
                  ))
                ) : (
                  <div>No products available. Please add some.</div>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              Page {currentPage} of{" "}
              {Math.ceil((productData || []).length / productsPerPage)}
            </p>
            <div className="flex gap-2">
              <button
                className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => {
                  if (currentPage > 1) {
                    paginate(currentPage - 1);
                  }
                }}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div>
                {Array.from(
                  {
                    length: Math.ceil(
                      (productData || []).length / productsPerPage
                    ),
                  },
                  (_, index) => (
                    <button
                      key={index + 1}
                      className={`mx-1 px-3 py-1 border ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : "border-gray-400 hover:bg-gray-200"
                      }`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
              <button
                className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => {
                  if (
                    currentPage <
                    Math.ceil((productData || []).length / productsPerPage)
                  ) {
                    paginate(currentPage + 1);
                  }
                }}
                disabled={
                  currentPage ===
                  Math.ceil((productData || []).length / productsPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projectable;
