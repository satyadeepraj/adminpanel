"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Header from "@/app/components/Header";
import SideBar from "@/app/components/SideBar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function EditProject({ id }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

 

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/product/${id}`);
      if (response.status === 200 && response.data.product) {
        setProduct(response.data.product);
      } else {
        toast.error("Product data not found.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product. Please try again.");
      setLoading(false);
    }
  };

  const companyNameRef = useRef();
  const projectNameRef = useRef();
  const scopeUrlRef = useRef();
  const typeRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const image4Ref = useRef();
  const reportIdsRef = useRef();

  const handleFormSubmit = async () => {
    const formData = new FormData();

    formData.append("companyName", companyNameRef.current.value);
    formData.append("projectName", projectNameRef.current.value);
    formData.append("scopeUrl", scopeUrlRef.current.value);
    formData.append("type", typeRef.current.value);
    formData.append("startDate", startDateRef.current.value);
    formData.append("endDate", endDateRef.current.value);

    const reportIds = reportIdsRef.current.value
      .split(",")
      .map((id) => id.trim());
    reportIds.forEach((id) => formData.append("reports", id));

    if (image1Ref.current.files[0]) {
      formData.append("image1", image1Ref.current.files[0]);
    }
    if (image2Ref.current.files[0]) {
      formData.append("image2", image2Ref.current.files[0]);
    }
    if (image3Ref.current.files[0]) {
      formData.append("image3", image3Ref.current.files[0]);
    }
    if (image4Ref.current.files[0]) {
      formData.append("image4", image4Ref.current.files[0]);
    }

    try {
      setLoading(true);
      const response = await axios.post(`/api/product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200 && response.data.status === "success") {
        toast.success(response.data.message);

        // Refresh product data in the context after successful update
        window.location.reload(); // This could be improved to update state instead
      } else {
        toast.error(response.data.message || "Failed to update product.");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product data available.</div>;
  }

  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          placeholder="Enter company name"
          ref={companyNameRef}
          defaultValue={product.companyName || ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="projectName">Project Name</Label>
        <Input
          id="projectName"
          placeholder="Enter project name"
          ref={projectNameRef}
          defaultValue={product.projectName || ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="scopeUrl">Scope URL</Label>
        <Input
          id="scopeUrl"
          placeholder="Enter scope URL"
          ref={scopeUrlRef}
          defaultValue={product.scopeUrl || ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Input
          id="type"
          placeholder="Enter type"
          ref={typeRef}
          defaultValue={product.type || ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="startDate">Start Date</Label>
        <Input
          id="startDate"
          type="date"
          ref={startDateRef}
          defaultValue={product.startDate || ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endDate">End Date</Label>
        <Input
          id="endDate"
          type="date"
          ref={endDateRef}
          defaultValue={product.endDate || ""}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reports">Report IDs (comma separated)</Label>
        <Textarea
          id="reports"
          placeholder="Enter report IDs"
          ref={reportIdsRef}
          defaultValue={(product.reports && product.reports.join(", ")) || ""}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="image-1">Image 1</Label>
          <Input id="image-1" type="file" ref={image1Ref} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image-2">Image 2</Label>
          <Input id="image-2" type="file" ref={image2Ref} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image-3">Image 3</Label>
          <Input id="image-3" type="file" ref={image3Ref} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image-4">Image 4</Label>
          <Input id="image-4" type="file" ref={image4Ref} />
        </div>
      </div>

      <Button onClick={handleFormSubmit} type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Product"}
      </Button>
    </div>
  );
}
