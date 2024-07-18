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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useParams } from "next/navigation";
import Loader from "../UserComponent/Loader";

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

  const params = useParams();
  const { id } = params;
  console.log(id);

  const image1Ref = useRef();
  // const image2Ref = useRef();
  // const image3Ref = useRef();
  // const image4ref = useRef();
  const [status, SetStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([
    { vulnerability: "", severity: "", images: [""] },
  ]);

  const vulnerabilities = [
    "Authentication Bypass",
    "Broken Access Control",
    "Reflected XSS",
    "Back Button Browsing",
    "Weak Cache Management",
    "Request Flooding",
    "Cross Site Request Forgery",
    "Session Replay",
    "Session Fixation",
    "No Account Lockout",
    "Use of Vulnerable Components",
    "Directory Listing",
    "Clickjacking Attack",
    "Cookie Not Flagged ‘HttpOnly’",
    "Server Banner Grabbing",
    "Cookies without Secure Flag",
    "HSTS Policy not Implemented",
    "Path is Set to Default Root i.e. '/'",
    "Audit Trails Not Implemented",
    "Insecure Communication",
    "DMARC Policy Not Implemented",
    "CSP Policy Header not implemented",
    "Weak Password Policy",
    "Another Domain Open In Same Tab",
    "Referer Policy Not Implemented",
];


  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append("productId", id);
    formData.append("email", emailRef.current.value);
    formData.append("documentype", documentypeRef.current.value);
    formData.append("documentversion", documentversionRef.current.value);
    formData.append("status", status);
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
        dateOfTestingCompletion: formatDate(
          dateOfTestingCompletionRef.current.value
        ),
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

    // if (image2Ref.current.files[0]) {
    //   formData.append("image2", image2Ref.current.files[0]);
    // }

    // if (image3Ref.current.files[0]) {
    //   formData.append("image3", image3Ref.current.files[0]);
    // }

    // if (image4ref.current.files[0]) {
    //   formData.append("image4", image4ref.current.files[0]);
    // }
    console.log(formData);
    // Add scammer details to formData

    try {
      setLoading(true);
      const response = await axios.post("/api/addBlogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      alert("Report added successfully!");

      // Reload page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add Report . Please try again.");
    } finally {
      setLoading(false);
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

  const [filteredVulnerabilities, setFilteredVulnerabilities] =
    useState(vulnerabilities);

  const handleInputChange = (index, value) => {
    handleSectionChange(index, "vulnerability", value);
    const newFilteredVulnerabilities = vulnerabilities.filter((vulnerability) =>
      vulnerability.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredVulnerabilities(newFilteredVulnerabilities);
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
          Add Reports
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-full max-h-full sm:max-w-[625px] sm:max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a New Report</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a report.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : (
          <>
            <div className="w-full">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="maintitle">Type Of Testing</Label>
                  <Input
                    id="maintitle"
                    placeholder="Enter Report - Type Of Testing"
                    ref={maintitleRef}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Target Scope</Label>
                    <Input id="email" placeholder="Enter SOW" ref={emailRef} />
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
                <div>
                  <div className="space-y-2">
                    <Label htmlFor="approvedby">Status</Label>
                    <Select onValueChange={(value) => SetStatus(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="Open" className="bg-[]">
                            Open
                          </SelectItem>
                          <SelectItem
                            value="PendingForReview"
                            className="bg-[]"
                          >
                            PendingForReview
                          </SelectItem>
                          <SelectItem
                            value="PendingForApproval"
                            className="bg-[]"
                          >
                            PendingForApproval
                          </SelectItem>
                          <SelectItem value="Closed" className="bg-[]">
                            Closed
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                    <div className="space-y-2">
                      <Label htmlFor={`section-vulnerability-${index}`}>
                        Vulnerability {index + 1}
                      </Label>
                      <Input
                        id={`section-vulnerability-${index}`}
                        placeholder="Enter or select section vulnerability"
                        value={section.vulnerability}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      />

                      <Select
                        onValueChange={(value) =>
                          handleSectionChange(index, "vulnerability", value)
                        }
                        value={section.vulnerability}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Vulnerability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Vulnerability</SelectLabel>

                            {filteredVulnerabilities.map(
                              (vulnerability, index) => (
                                <SelectItem key={index} value={vulnerability}>
                                  {vulnerability}
                                </SelectItem>
                              )
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <Label htmlFor={`section-severity-${index}`}>
                      Severity
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
                          <SelectItem value="Critical" className="bg-[]">
                            Critical
                          </SelectItem>
                          <SelectItem value="High" className="bg-[]">
                            High
                          </SelectItem>
                          <SelectItem value="Medium" className="bg-[]">
                            Medium
                          </SelectItem>
                          <SelectItem value="Low" className="bg-[]">
                            Low
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Label htmlFor={`section-images-${index}`}>
                      POC {index + 1}
                    </Label>
                    {section.images.map((image, imageIndex) => (
                      <Input
                        key={imageIndex}
                        id={`section-image-${index}-${imageIndex}`}
                        placeholder={`Upload section image ${imageIndex + 1}`}
                        type="file"
                        onChange={(e) =>
                          handleImageChange(
                            index,
                            imageIndex,
                            e.target.files[0]
                          )
                        }
                      />
                    ))}
                    <Button onClick={() => addImage(index)}>Add POC</Button>
                  </div>
                ))}
                <Button type="button" onClick={addSection}>
                  Add Vulnerability
                </Button>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-1">Company Logo</Label>
                    <Input ref={image1Ref} id="image-1" required type="file" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maincontent">
                    Additional Information / Remarks{" "}
                  </Label>
                  <Textarea
                    className="min-h-[100px]"
                    id="maincontent"
                    placeholder="Enter blog post content"
                    ref={maincontentRef}
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleFormSubmit} type="submit">
                    Publish
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
