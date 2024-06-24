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
  const { author } = props;
  return (
    <Card className="w-full  m-12 max-w-sm">
      <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
        <CardHeader>
          <Link className="absolute inset-0 z-10" href={`/blogdetails/${props.id}`}>
            <span className="sr-only">View post</span>
          </Link>
          <img
            alt="Blog post image"
            className="h-80  w-full object-cover transition-all group-hover:scale-110 rounded-2xl"
            height={800}
            src={props.image}
            style={{
              aspectRatio: "600/800",
              objectFit: "cover",
            }}
            width={600}
          />
        </CardHeader>
        <div className="space-y-2 p-4">
          <CardContent className="-mt-2">
            <h3 className="text-xl font-semibold">{props.maintitle}</h3>
            <p className="text-gray-500 line-clamp-2">{props.maincontent}</p>
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
              <Button >view more</Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
