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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddBlog() {
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
  const image2Ref = useRef();
  const image3Ref = useRef();
  const image4ref = useRef();

  const [sections, setSections] = useState([
    { vulnerability: "", severity: "", images: [""] },
  ]);

  const handleFormSubmit = async () => {
    const formData = new FormData();

    formData.append("email", emailRef.current.value);
    formData.append("documentype", documentypeRef.current.value);
    formData.append("documentversion", documentversionRef.current.value);

    formData.append("maintitle", maintitleRef.current.value);
    formData.append("maincontent", maincontentRef.current.value);

    const formatDate = (date) => {
      if (!date) return null;
      const selectedDate = new Date(date);
      return selectedDate.toISOString().split("T")[0];
    };

    const formattedDateOfReport = formatDate(dateOfReportRef.current.value);
    formData.append("dateOfReport", formattedDateOfReport);
  

    const author = [
      {
        preparedby: preparedbyRef.current.value,
        approvedby: approvedbyRef.current.value,
        dateOfTesting: formatDate(dateOfTestingRef.current.value),
        dateOfTestingCompletion: formatDate(dateOfTestingCompletionRef.current.value),
        dateOfApproval: formatDate(dateOfApprovalRef.current.value),
      },
    ];

    formData.append("author", JSON.stringify(author));
    console.log(author);

    sections.forEach((section, index) => {
      formData.append(
        `sections[${index}][vulnerability]`,
        section.vulnerability
      );
      formData.append(`sections[${index}][severity]`, section.severity);
      section.images.forEach((image, imageIndex) => {
        formData.append(`sections[${index}][images][${imageIndex}]`, image);
        console.log(image);
      });
    });

    if (image1Ref.current.files[0]) {
      formData.append("image1", image1Ref.current.files[0]);
    }

    if (image2Ref.current.files[0]) {
      formData.append("image2", image2Ref.current.files[0]);
    }

    if (image3Ref.current.files[0]) {
      formData.append("image3", image3Ref.current.files[0]);
    }

    if (image4ref.current.files[0]) {
      formData.append("image4", image4ref.current.files[0]);
    }
    console.log(formData);
    // Add scammer details to formData

    try {
      const response = await axios.post("/api/addBlogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      toast.success("Blog post added successfully!", {
        onClose: () => window.location.reload(),
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to add blog post. Please try again.");
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

  return (
    <div className=" min-h-screen w-full">
      <Header />
      <ToastContainer />
      <div className="flex flex-col sm:flex-row   max-w-full min-h-screen">
        <div className="w-[25%] mobile:hidden">
          <SideBar />
        </div>
        <div className="w-full mt-16 max-w-6xl mx-auto p-6 md:p-8 lg:p-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="maintitle">Title</Label>
              <Input
                id="maintitle"
                placeholder="Enter blog post title"
                ref={maintitleRef}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maincontent">Content</Label>
              <Textarea
                className="min-h-[300px]"
                id="maincontent"
                placeholder="Enter blog post content"
                ref={maincontentRef}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter email" ref={emailRef} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfReport">Date of Report</Label>
                <Input
                  id="dateOfReport"
                  placeholder="Enter date of report"
                  ref={dateOfReportRef}
                  type="date"
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentype">Document Type</Label>
                <Input
                  id="documentype"
                  placeholder="Enter document type"
                  ref={documentypeRef}
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="approvedby">Approved By</Label>
                <Input
                  id="approvedby"
                  placeholder="Enter approved by"
                  ref={approvedbyRef}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dateOfTesting">Date of Testing</Label>
                <Input
                  id="dateOfTesting"
                  placeholder="Enter date of testing"
                  ref={dateOfTestingRef}
                  type="date"
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfApproval">Date of Approval</Label>
                <Input
                  id="dateOfApproval"
                  placeholder="Enter date of approval"
                  ref={dateOfApprovalRef}
                  type="date"
                />
              </div>
            </div>
            {sections.map((section, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`section-vulnerability-${index}`}>
                  Section {index + 1} Vulnerability
                </Label>
                <Input
                  id={`section-vulnerability-${index}`}
                  placeholder="Enter section vulnerability"
                  value={section.vulnerability}
                  onChange={(e) =>
                    handleSectionChange(index, "vulnerability", e.target.value)
                  }
                />
                <Label htmlFor={`section-severity-${index}`}>
                  Section {index + 1} Severity
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSectionChange(index, "severity", value)
                  }
                  value={section.severity}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Severity</SelectLabel>
                      <SelectItem value="Critical" className="bg-[]">Critical</SelectItem>
                      <SelectItem value="High" className="bg-[]">High</SelectItem>
                      <SelectItem value="Medium" className="bg-[]">Medium</SelectItem>
                      <SelectItem value="Low" className="bg-[]">Low</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Label htmlFor={`section-images-${index}`}>
                  Section {index + 1} Images
                </Label>
                {section.images.map((image, imageIndex) => (
                  <Input
                    key={imageIndex}
                    id={`section-image-${index}-${imageIndex}`}
                    placeholder={`Upload section image ${imageIndex + 1}`}
                    type="file"
                    onChange={(e) =>
                      handleImageChange(index, imageIndex, e.target.files[0])
                    }
                  />
                ))}
                <Button onClick={() => addImage(index)}>Add Image</Button>
              </div>
            ))}
            <Button type="button" onClick={addSection}>
              Add Section
            </Button>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image-1">Image 1</Label>
                <Input ref={image1Ref} id="image-1" required type="file" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-2">Image 2</Label>
                <Input ref={image2Ref} id="image-2" required type="file" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-3">Image 3</Label>
                <Input ref={image3Ref} id="image-3" required type="file" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image-4">Image 4</Label>
                <Input ref={image4ref} id="image-4" required type="file" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleFormSubmit} type="submit">
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
