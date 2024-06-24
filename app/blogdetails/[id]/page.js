"use client";
import React from "react";
import { useRef } from "react";
import { Blogdetail } from "./Blogdetail";
import Header from "@/app/components/Header";
import SideBar from "@/app/components/SideBar";
import { ToastContainer } from "react-toastify";

import html2pdf from "html2pdf.js";
import Report from "@/app/components/Report";

const page = () => {
  const reportRef = useRef();

  const downloadReport = () => {
    const element = reportRef.current;
    const images = element.querySelectorAll("img");

    // Wait for all images to load
    const loadImagePromises = Array.from(images).map((img) => {
      if (img.complete) {
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(loadImagePromises)
      .then(() => {
        const opt = {
          margin: 0.4,
          filename: "report.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true, // Enable CORS to handle images from other origins
            onclone: (clonedDoc) => {
              // Ensure images are loaded in the cloned document
              const clonedImages = clonedDoc.querySelectorAll("img");
              clonedImages.forEach((img) => {
                if (!img.complete) {
                  const promise = new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                  });
                  return promise;
                }
              });
            },
          },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().from(element).set(opt).save();
      })
      .catch((error) => {
        console.error("Error loading images:", error);
      });
  };
  return (
    <div>
      <div className=" min-h-screen w-full">
        <Header />
        <ToastContainer />
        <div className="flex  flex-col sm:flex-row   max-w-full min-h-screen">
          <div className="w-[25%] mobile:hidden">
            <SideBar />
          </div>
          <div className="container mx-auto py-24">
            <button
              onClick={downloadReport}
              className="mb-4 p-2 bg-blue-500 text-white rounded"
            >
              Download Report
            </button>
            <div ref={reportRef}>
              <Report />
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default page;
