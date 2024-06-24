"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Assuming that the IStaticMethods interface is present in the "preline/preline" module
// You might need to adjust the import based on the actual structure of your module
import { IStaticMethods } from "preline/preline";

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    // Import the "preline/preline" module dynamically
    import("preline/preline").then(() => {
      // Perform any additional initialization if needed
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      // Call the autoInit method on HSStaticMethods after a delay
      window.HSStaticMethods.autoInit();
    }, 100);
  }, [path]);

  // Return null as the component does not render anything
  return null;
}
