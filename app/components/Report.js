import React from "react";
import { useData } from "@/context/DataContext";
import Page1 from "@/components/Page1";
import Page2 from "@/components/Page2";
import Page3 from "@/components/Page3";
import Page4 from "@/components/Page4";
import Page5 from "@/components/Page5";
import Page8 from "@/components/Page8";
import Page6 from "@/components/Page6";
import Page7 from "@/components/Page7";
import Page10 from "@/components/Page10";
import Page11 from "@/components/Page11";

import Page13 from "@/components/Page13";

const Report = () => {
  const { blogData } = useData();

  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="report">
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 />
      <Page7 />
      <Page8 />
      <Page10 />
      <Page11 />
     
      <Page13/>
    
    </div>
  );
};

export default Report;
