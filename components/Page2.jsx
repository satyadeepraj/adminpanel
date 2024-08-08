import React from "react";

const Page2 = ({ pageNumber,totalPages }) => {
  return (
    <div id="page2" className="page w-[100%] h-[100%] bg-white border-8 border-black p-[100px] m-1">
      <div className="py-[100px]">
        <h1 className="text text-3xl font-semibold ">Disclaimer: </h1>
        <p className="text-justify py-2 leading-relaxed">
          This report and any supplements are HIGHLY CONFIDENTIAL and may be
          protected by one or more legal privileges. It is intended solely for
          the use of the relevant IT personnel in the organization. This report
          is prepared based on the IT environment that prevailed in the period
          of assessment.
        </p>
        <p className="text-justify leading-relaxed">
          This report is not a guarantee or certification that all
          vulnerabilities have been discovered and reported in the findings.
          Subsequent reviews may report on previously unidentified findings or
          on new vulnerabilities. The samples screen shot should not be treated
          as the final vulnerabilities. Gaps which we have identified can also
          get replicated in any part of the Infrastructure. Organization should
          ensure that Vulnerability Management Program should be adapted
          continuously rather than fixing just the issues identified within the
          areas which A2DGC (P) Ltd. has highlighted.
        </p>
      </div>
      <div className="mt-16 text-center">
        <p className="text-sm text-gray-600">Confidential</p>
        <p className="text-sm text-gray-600">  Page {pageNumber} of {totalPages}</p>
      </div>
    </div>
  );
};

export default Page2;
