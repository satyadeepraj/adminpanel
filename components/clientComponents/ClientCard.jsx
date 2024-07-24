"use client";
import Link from "next/link";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useStore } from "@/store";

export function ClientCard({ companyName, projectName, images }) {
  const { product } = useStore();

  return (
    <Card className="w-1/2 mx-auto">
      <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
        <CardHeader>
          <Link
            href={`/client-AllReports/${product._id}`}
            className="absolute inset-0 z-10"
          >
            <span className="sr-only">View post</span>
          </Link>

          <img
            src={
              images ||
              "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
            }
            alt="Company Logo"
            className="w-[20%] mx-auto transition-all group-hover:scale-110 rounded-full"
          />
        </CardHeader>
        <div className="mobile:space-y-0 mobile:p-0">
          <CardContent className="-mt-2">
            <h3 className="text-xl font-semibold group-hover:text-[#c50000]">
              {projectName}
            </h3>
          </CardContent>
          <div className="border border-1 border-gray-300"></div>
          <CardFooter>
            <Button
              variant="outline"
              className="text-[#c50000] border border-[#c50000] p-4 ml-[570px] mt-4"
            >
              View Reports
              <img className="w-5 h-5 ml-2" src="/arrowright.gif" />
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
