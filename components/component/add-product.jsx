"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import axios from "axios";
import Header from "@/app/components/Header";
import SideBar from "@/app/components/SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loader from "../UserComponent/Loader";


export function AddProduct() {
  const companyNameRef = useRef();
  const projectNameRef = useRef();
  const scopeUrlRef = useRef();
  const typeRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  const image1Ref = useRef();
  // const image2Ref = useRef();
  // const image3Ref = useRef();
  // const image4Ref = useRef();

  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async () => {
    const formData = new FormData();

    formData.append("companyName", companyNameRef.current.value);
    formData.append("projectName", projectNameRef.current.value);
    formData.append("scopeUrl", scopeUrlRef.current.value);
    formData.append("type", typeRef.current.value);
    formData.append("startDate", startDateRef.current.value);
    formData.append("endDate", endDateRef.current.value);

    if (image1Ref.current.files[0]) {
      formData.append("image1", image1Ref.current.files[0]);
    }
    // if (image2Ref.current.files[0]) {
    //   formData.append("image2", image2Ref.current.files[0]);
    // }
    // if (image3Ref.current.files[0]) {
    //   formData.append("image3", image3Ref.current.files[0]);
    // }
    // if (image4Ref.current.files[0]) {
    //   formData.append("image4", image4Ref.current.files[0]);
    // }

    try {
      setLoading(true);
      const response = await axios.post("/api/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product added successfully!");

      // Reload page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex select-none items-center gap-3 rounded-lg bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            stroke-width="2"
            className="w-4 h-4"
          >
            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
          </svg>
          Add Project
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[625px] sm:max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a New Product</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new product.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : (
          <>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            placeholder="Enter company name"
            ref={companyNameRef}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            placeholder="Enter project name"
            ref={projectNameRef}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="scopeUrl">Scope URL</Label>
          <Input
            id="scopeUrl"
            placeholder="Enter scope URL"
            ref={scopeUrlRef}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Document Type</Label>
          <Input id="type" placeholder="Enter Document type" ref={typeRef} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" type="date" ref={startDateRef} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" type="date" ref={endDateRef} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="image-1">Company Logo</Label>
            <Input ref={image1Ref} id="image-1" type="file" />
          </div>
      
        </div>
        <DialogFooter>
          <Button onClick={handleFormSubmit} type="submit">
            Add Product
          </Button>
        </DialogFooter>
        </>
        )}
      </DialogContent>
    </Dialog>
  );
}
