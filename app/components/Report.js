import React from "react";
import { useData } from "@/context/DataContext";
import Page1 from "@/components/Page1";
import Page2 from "@/components/Page2";
import Page3 from "@/components/Page3";
import Page4 from "@/components/Page4";
import Page5 from "@/components/Page5";
import Page6 from "@/components/Page6";
import Page7 from "@/components/Page7";
import Page8 from "@/components/Page8";
import Page10 from "@/components/Page10";
import Page11 from "@/components/Page11";
import Page13 from "@/components/Page13";

const Report = () => {
  const { blogData } = useData();

  if (!blogData) {
    return <div>Loading...</div>;
  }

  const pages = [
    Page1,
    Page2,
    Page3,
    Page4,
    Page5,
    Page6,
    Page7,
    Page8,
    Page10,
    Page11,
    Page13,
  ];
  const totalPages = pages.length;

  let pageNumberCounter = 1;

  return (
    <div className="report">
      {pages.map((PageComponent, index) => {
        let pageNumber = pageNumberCounter;
        if (PageComponent === Page11) {
          const user = blogData.find((user) => user._id === "your_specific_id");
          const userSections = user?.sections?.length || 0;
          pageNumberCounter += userSections - 1;
        }
        pageNumberCounter += 1;

        return (
          <PageComponent
            key={index}
            pageNumber={pageNumber}
            totalPages={totalPages}
          />
        );
      })}
    </div>
  );
};

export default Report;
