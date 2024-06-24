"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [blogData, setBlogData] = useState();
  const [productData, setProductData] = useState([]);
  const [userSeverityCounts, setUserSeverityCounts] = useState({});

  // Fetch both sets of data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await axios.get("/api/blogs");

        const blogProducts = blogResponse.data.data;

        setBlogData(blogProducts);
        // Calculate severity counts
        const counts = blogProducts.reduce((acc, blog) => {
          const userCounts = blog.sections.reduce(
            (userAcc, section) => {
              userAcc[section.severity] = (userAcc[section.severity] || 0) + 1;
              return userAcc;
            },
            { Critical: 0, High: 0, Medium: 0, Low: 0 }
          );

          acc[blog._id] = userCounts;
          return acc;
        }, {});

        setUserSeverityCounts(counts);

        // Fetch product data
        const productResponse = await axios.get("/api/products");
        const productItems = productResponse.data.data;
        setProductData(productItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const contextValue = { blogData, productData, userSeverityCounts };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
