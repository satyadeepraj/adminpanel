"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Header from "@/app/components/Header";
import SideBar from "@/app/components/SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/UserComponent/Loader";
import { useData } from "@/context/DataContext";

export function EditReports() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [selectedImage1, setSelectedImage1] = useState(null);
  const params = useParams();
  const { productId, blogId } = params;
  const { productData, setIsEditing } = useData();
  // console.log(productData,blogId,productId);

  useEffect(() => {
    setIsEditing(true); // Enable edit mode

    if (productData && productData.length > 0) {
      const product = productData.find((e) => e._id.toString() === productId);
      if (product) {
        const blog = product.reports.find(
          (e) => e.blogId?._id.toString() === blogId
        );
        if (blog && blog.blogId) {
          setBlog(blog.blogId);
        } else {
          setBlog(null);
        }
      } else {
        setBlog(null);
      }
    }
    return () => {
      setIsEditing(false); // Disable edit mode
    };
  }, [productData, productId, blogId,setIsEditing]);

  const maintitleRef = useRef();
  const emailRef = useRef();
  const documentypeRef = useRef();
  const documentversionRef = useRef();
  const dateOfReportRef = useRef();
  const preparedbyRef = useRef();
  const approvedbyRef = useRef();
  const dateOfTestingRef = useRef();
  const dateOfTestingCompletionRef = useRef();
  const dateOfApprovalRef = useRef();
  const maincontentRef = useRef();
  const image1Ref = useRef();
  const [status, setStatus] = useState("");
  const [sections, setSections] = useState([
    { vulnerability: "", severity: "", images: [""] },
  ]);

  useEffect(() => {
    if (blog) {
      maintitleRef.current.value = blog.maintitle || "";
      emailRef.current.value = blog.email || "";
      documentypeRef.current.value = blog.documentype || "";
      documentversionRef.current.value = blog.documentversion || "";
      dateOfReportRef.current.value = blog.dateOfReport
        ? new Date(blog.dateOfReport).toISOString().split("T")[0]
        : "";

      preparedbyRef.current.value = blog.author?.[0]?.preparedby || "";
      approvedbyRef.current.value = blog.author?.[0]?.approvedby || "";
      dateOfTestingRef.current.value = blog.author?.[0]?.dateOfTesting
        ? new Date(blog.author?.[0]?.dateOfTesting).toISOString().split("T")[0]
        : "";
      dateOfTestingCompletionRef.current.value = blog.author?.[0]
        ?.dateOfTestingCompletion
        ? new Date(blog.author?.[0]?.dateOfTestingCompletion)
            .toISOString()
            .split("T")[0]
        : "";
      dateOfApprovalRef.current.value = blog.author?.[0]?.dateOfApproval
        ? new Date(blog.author?.[0]?.dateOfApproval).toISOString().split("T")[0]
        : "";
      maincontentRef.current.value = blog.maincontent || "";
      setStatus(blog.status || "");
      setSections(blog.sections || []);
    }
  }, [blog]);

  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append("maintitle", maintitleRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("documentype", documentypeRef.current.value);
    formData.append("documentversion", documentversionRef.current.value);
    formData.append("status", status);
    formData.append("maincontent", maincontentRef.current.value);

    const formatDate = (date) => {
      if (!date) return null;
      const selectedDate = new Date(date);
      return selectedDate.toISOString().split("T")[0];
    };

    formData.append("dateOfReport", formatDate(dateOfReportRef.current.value));

    const author = [
      {
        preparedby: preparedbyRef.current.value,
        approvedby: approvedbyRef.current.value,
        dateOfTesting: formatDate(dateOfTestingRef.current.value),
        dateOfTestingCompletion: formatDate(
          dateOfTestingCompletionRef.current.value
        ),
        dateOfApproval: formatDate(dateOfApprovalRef.current.value),
      },
    ];
    formData.append("author", JSON.stringify(author));

    sections.forEach((section, index) => {
      formData.append(
        `sections[${index}][vulnerability]`,
        section.vulnerability
      );
      formData.append(`sections[${index}][severity]`, section.severity);
      section.images.forEach((image, imageIndex) => {
        formData.append(`sections[${index}][images][${imageIndex}]`, image);
      });
    });

    if (image1Ref.current.files[0]) {
      formData.append("image1", image1Ref.current.files[0]);
    } else {
      formData.append("existingImage1", blog.images[0]);
    }

    try {
      setLoading(true);
      console.log(formData, "********line 158*******");
      const response = await axios.put(
        `/api/updateReports/${productId}/${blogId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200 && response.data.status === "success") {
        // Handle success
        console.log("Update successful:", response.data);
        // Update product data in the context after successful update
        const updatedProduct = response.data.product;
        const updatedProductData = productData.map((prod) =>
          prod._id === productId ? updatedProduct : prod
        );
        setBlog(updatedProductData);
        alert("Report Updated successfully!");
        // Reset selected image state
        setSelectedImage1(null);
        // Navigate to the report list page
        router.push(`/report-list/${productId}`);
      } else {
        toast.error(response.data.message || "Failed to update Report.");
      }
    } catch (error) {
      console.error("Error updating Report:", error);
      toast.error("Failed to update Report. Please try again.");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const handleImageChange = (sectionIndex, imageIndex, file) => {
    const newSections = [...sections];
    newSections[sectionIndex].images[imageIndex] = file;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([
      ...sections,
      { vulnerability: "", severity: "", images: [""] },
    ]);
  };

  const addImage = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].images.push("");
    setSections(newSections);
  };
  const handleImage1Change = (e) => {
    setSelectedImage1(URL.createObjectURL(e.target.files[0]));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  if (!blog) {
    return <div>No blog data available.</div>;
  }

  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor="maintitle">Type Of Testing</Label>
        <Input
          id="maintitle"
          placeholder="Enter Report - Type Of Testing"
          ref={maintitleRef}
          defaultValue={blog.maintitle || ""}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Target Scope</Label>
          <Input
            id="email"
            placeholder="Enter SOW"
            ref={emailRef}
            defaultValue={blog.email || ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfReport">Date of Report</Label>
          <Input
            id="dateOfReport"
            placeholder="Enter date of report"
            ref={dateOfReportRef}
            type="date"
            defaultValue={
              blog.dateOfReport
                ? new Date(blog.dateOfReport).toISOString().split("T")[0]
                : ""
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="documentversion">Document Version</Label>
          <Input
            id="documentversion"
            placeholder="Enter document version"
            ref={documentversionRef}
            defaultValue={blog.documentversion || ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="documentype">Document Type</Label>
          <Input
            id="documentype"
            placeholder="Enter document type"
            ref={documentypeRef}
            defaultValue={blog.documentype || ""}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="preparedby">Prepared By</Label>
          <Input
            id="preparedby"
            placeholder="Enter prepared by"
            ref={preparedbyRef}
            defaultValue={blog.preparedby || ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="approvedby">Approved By</Label>
          <Input
            id="approvedby"
            placeholder="Enter approved by"
            ref={approvedbyRef}
            defaultValue={blog.approvedby || ""}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          onValueChange={(value) => setStatus(value)} // Update state on change
          defaultValue={blog.status || ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="Open" className="bg-[]">
                Open
              </SelectItem>
              <SelectItem value="PendingForReview" className="bg-[]">
                PendingForReview
              </SelectItem>
              <SelectItem value="PendingForApproval" className="bg-[]">
                PendingForApproval
              </SelectItem>
              <SelectItem value="Closed" className="bg-[]">
                Closed
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="dateOfTesting">Date of Testing</Label>
          <Input
            id="dateOfTesting"
            placeholder="Enter date of testing"
            ref={dateOfTestingRef}
            type="date"
            defaultValue={
              blog.dateOfTesting
                ? new Date(blog.dateOfTesting).toISOString().split("T")[0]
                : ""
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfTestingCompletion">
            Date of Testing Completion
          </Label>
          <Input
            id="dateOfTestingCompletion"
            placeholder="Enter date of testing completion"
            ref={dateOfTestingCompletionRef}
            type="date"
            defaultValue={
              blog.dateOfTestingCompletion
                ? new Date(blog.dateOfTestingCompletion)
                    .toISOString()
                    .split("T")[0]
                : ""
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateOfApproval">Date of Approval</Label>
          <Input
            id="dateOfApproval"
            placeholder="Enter date of approval"
            ref={dateOfApprovalRef}
            type="date"
            defaultValue={
              blog.dateOfApproval
                ? new Date(blog.dateOfApproval).toISOString().split("T")[0]
                : ""
            }
          />
        </div>
      </div>

      <div className="">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div className="space-y-2">
                <Label htmlFor={`vulnerability-${sectionIndex}`} className="">
                  Vulnerability {sectionIndex + 1}
                </Label>
                <Input
                  id={`vulnerability-${sectionIndex}`}
                  value={section.vulnerability}
                  onChange={(e) =>
                    handleSectionChange(
                      sectionIndex,
                      "vulnerability",
                      e.target.value
                    )
                  }
                  placeholder="Enter vulnerability"
                  defaultValue={section.vulnerability || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`severity-${sectionIndex}`}>Severity</Label>
                <Select
                  onValueChange={(value) =>
                    handleSectionChange(sectionIndex, "severity", value)
                  }
                  value={section.severity}
                  defaultValue={section.severity || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Severity</SelectLabel>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Info">Info</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`section-images-${sectionIndex}`}>
                POC {sectionIndex + 1}
              </Label>
              {section.images.map((image, imageIndex) => (
                <div key={imageIndex} className="flex flex-col  space-y-2">
                  <Input
                    type="file"
                    onChange={(e) =>
                      handleImageChange(
                        sectionIndex,
                        imageIndex,
                        e.target.files[0]
                      )
                    }
                  />
                  {image ? (
                    typeof image === "string" ? (
                      <img
                        src={image}
                        alt={`Section ${sectionIndex} Image ${imageIndex}`}
                        className="mt-2 w-[20%] "
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Section ${sectionIndex} Image ${imageIndex}`}
                        className="mt-2 w-[20%] "
                      />
                    )
                  ) : null}
                </div>
              ))}

              <Button type="button" onClick={() => addImage(sectionIndex)}>
                Add Image
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" onClick={addSection} className="mt-4 mb-4">
          Add Vulnerability
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-4">
          <Label htmlFor="image-1">Company logo</Label>
          <Input
            id="image-1"
            type="file"
            ref={image1Ref}
            onChange={handleImage1Change}
          />
          {selectedImage1 ? (
            <img
              src={selectedImage1}
              alt="Selected Image 1"
              className="mt-2 w-[20%] mx-auto"
            />
          ) : blog.images && blog.images[0] ? (
            <img
              src={blog.images[0]}
              alt="Current Image 1"
              className="mt-2 w-[20%] mx-auto"
            />
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="maincontent">
          Additional information / Remarks In Card
        </Label>
        <Textarea
          id="maincontent"
          placeholder="Enter blog post content"
          ref={maincontentRef}
          defaultValue={blog.maincontent || ""}
        />
      </div>

      <div className="py-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Update Report</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Report</DialogTitle>
              <DialogDescription>
                Are you sure you want to update this Report?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleFormSubmit}>Update</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
