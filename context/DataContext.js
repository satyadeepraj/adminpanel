"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [blogData, setBlogData] = useState();
  const [productData, setProductData] = useState([]);
  const [vulnerabilityData, setvulnerabilityData] = useState([]);
  const [userSeverityCounts, setUserSeverityCounts] = useState({});
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  
  // Fetch both sets of data when the component mounts

  const fetchData = async () => {
    try {
        // Skip fetching if in edit mode
        if (isEditing) return;

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

      // Fetch Vulnerability data
      const vulnerabilityResponse = await axios.get("/api/newVulnerability");
      const vulnerabilityItems = vulnerabilityResponse.data.data;
      setvulnerabilityData(vulnerabilityItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    // Revalidate data on window focus
    const handleRevalidate = () => {
      if (!isEditing) {
        fetchData();
      }
    };

    window.addEventListener("input", handleRevalidate);
    window.addEventListener("change", handleRevalidate);
    window.addEventListener("click", handleRevalidate);

    return () => {
      window.removeEventListener("input", handleRevalidate);
      window.removeEventListener("change", handleRevalidate);
      window.removeEventListener("click", handleRevalidate);
    };
  }, [isEditing]);

  const contextValue = {
    blogData,
    productData,
    vulnerabilityData,
    userSeverityCounts,
    setIsEditing, // Expose setIsEditing to the context
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
