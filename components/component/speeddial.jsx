import React from "react";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
// import { useEffect, useState } from "react";
// import axios from "axios";

import { useSession, signOut } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
export function Speeddial() {
  // const [session, setSession] = useState();
 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/api/secureroute");
  //       setSession(response.data.user);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
 
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-9 w-9">
            <AvatarImage
              alt={`profile photo of `}
              src={"/images/default.png"}
            />
            <AvatarFallback>
              {}
            </AvatarFallback>
            <span className="sr-only">Toggle user menu</span>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
           Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
   
  );
}

// function LogOut(props) {
//   const router = useRouter(); // Initialize the Next.js router.
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(""); // State for handling errors during authentication.

//   const searchParams = useSearchParams(); // Get query parameters from the URL.
//   const callbackUrl = searchParams.get("callbackUrl") || `/`;

//   return (
//     <div>
//       <Button
//         onClick={() => signOut("google", { callbackUrl })}
//         className="text-red-500 w-[100px] border-red-500 hover:bg-red-500 hover:text-white transition-colors"
//         variant="outline"
//       >
//         Logout
//       </Button>
//     </div>
//   );
// }
