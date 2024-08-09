import Link from "next/link";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "../ui/button";

export function BlogCard(props) {
  const { author,status } = props;
  const getSeverityBgColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-red-500"; /* LightGreen */
      case "PendingForReview":
        return "bg-yellow-500"; /* LightYellow */
      case "PendingForApproval":
        return "bg-[#8B0000]"; /* LightCoral */
      case "Closed":
        return "bg-green-500"; /* LightGray */
      default:
        return "";
    }
  };
  return (
    <Card className="w-1/3  m-12 max-w-sm">
      <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
        <CardHeader>
          <Link
            className="absolute inset-0 z-10"
            href={`/blogdetails/${props.id}`}
          >
            <span className="sr-only">View post</span>
          </Link>
          <img
            alt="Blog post image"
            className="h-52  w-full object-cover transition-all group-hover:scale-110 rounded-2xl"
            height={400}
            src={props.image}
            style={{
              aspectRatio: "200/400",
              objectFit: "cover",
            }}
            width={200}
          />
        </CardHeader>
        <div className=" p-4">
          <CardContent className="-mt-2">
            <h3 className="text-xl font-semibold">{props.maintitle}</h3>
            <p
             className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold text-white uppercase rounded-md select-none whitespace-nowrap ${getSeverityBgColor(
              status
            )}`}
            >
              {status}
            </p>
          </CardContent>
          <CardFooter>
            <div className="flex items-center justify-between ">
              <div
                aria-label={`By ${author[0].preparedby}`}
                className="relative text-sm text-gray-500 transition-all group-hover:text-gray-900 group-hover:font-medium group-hover:after:content-[attr(aria-label)] group-hover:after:ml-1"
              >
                <span className="group-hover:hidden">{props.dateOfReport}</span>
              </div>
            </div>
            <div className="ml-[80px]">
              {" "}
              <Button>view more</Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
