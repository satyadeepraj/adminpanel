"use client";
import React from "react";

import { Loader } from "@/components/component/loader";
import { useData } from "@/context/DataContext";
import { BlogCard } from "@/components/component/blog-card";

const Allblogs = () => {
  const { blogData } = useData();
  const options = { month: "long", day: "numeric", year: "numeric" };
  console.log(blogData && blogData);

  if (!blogData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap mx-auto">
      {blogData.map((e) => {
        const formattedDateOfReport = new Intl.DateTimeFormat(
          "en-US",
          options
        ).format(new Date(e.dateOfReport));
        return (
          <BlogCard
            key={e._id}
            id={e._id}
            maintitle={e.maintitle}
            maincontent={e.maincontent}
            dateOfReport={formattedDateOfReport}
            author={e.author}
            image={e.images[0]}
          />
        );
      })}
    </div>
  );
};

export default Allblogs;
