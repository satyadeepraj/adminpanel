"use client";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useData } from "@/context/DataContext";
import { Loader } from "@/components/component/loader";

export function Blogdetail() {
  const { id } = useParams();
  const { blogData } = useData();
  const options = { month: "long", day: "numeric", year: "numeric" };
  let User;

  if (blogData && id) {
    console.log(id);
    User = blogData.find((e) => e._id == id);
    console.log(User);
  }
  if (!blogData) {
    return (
      <div className=" px-96">
        <Loader />
      </div>
    );
  }

  if (!User) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-col min-h-[100dvh] mt-24 mr-8">
      <header className="bg-gray-100 dark:bg-gray-800 py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="space-y-2 not-prose">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                The Future of Web Development: Embracing the Power of Serverless
              </h1>
              <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                <div>
                  <img
                    alt="Author Avatar"
                    className="rounded-full"
                    height={32}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width={32}
                  />
                </div>
                <div>{User.author}</div>
                <div>•</div>
                <div>
                  {new Date(User.createdAt).toLocaleDateString(
                    "en-GB",
                    options
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 md:px-6 py-12 md:py-16 lg:py-20 grid md:grid-cols-[1fr_300px] gap-12 lg:gap-16">
          <article className="prose prose-gray max-w-none dark:prose-invert p-6">
            <div className="flex space-x-4 mb-2 text-gray-600">
              <div className="flex items-center space-x-1">
                <img src="/calendar.png" alt="no image" className="h-5 w-5" />
                <span>
                  {new Date(User.createdAt).toLocaleDateString(
                    "en-GB",
                    options
                  )}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <img src="/user.png" alt="no image" className="h-5 w-5" />
                <span>{User.author}</span>
              </div>
              <div className="flex items-center  space-x-1">
                <FolderIcon className="h-5 w-5" />
                <span>{User.tags}</span>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-4xl py-5">{User.maintitle}</h2>
            </div>
            <img
              alt=""
              className="w-full h-[40rem] pb-6 object-cover"
              height={32}
              src={User.images[0]}
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width={32}
            />

            <p className="text-justify leading-relaxed py-5">
              {User.maincontent}
            </p>

            {User.sections.map((section, index) => (
              <div key={index}>
                {section.title && (
                  <>
                    <h2 className="font-bold text-2xl">{section.title}</h2>
                    {section.content.map((content, contentIndex) => (
                      <p
                        key={contentIndex}
                        className="text-justify leading-relaxed py-2"
                      >
                        {content}
                      </p>
                    ))}
                  </>
                )}
              </div>
            ))}
          </article>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Related Posts</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Link
                  className="group grid grid-cols-[48px_1fr] gap-4 items-center"
                  href="#"
                >
                  <img
                    alt="Blog Post Image"
                    className="rounded-md"
                    height={48}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "48/48",
                      objectFit: "cover",
                    }}
                    width={48}
                  />
                  <div className="space-y-1">
                    <div className="text-sm font-medium group-hover:underline">
                      Unlocking the Power of Serverless: A Guide for Developers
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      May 25, 2024
                    </div>
                  </div>
                </Link>
                <Link
                  className="group grid grid-cols-[48px_1fr] gap-4 items-center"
                  href="#"
                >
                  <img
                    alt="Blog Post Image"
                    className="rounded-md"
                    height={48}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "48/48",
                      objectFit: "cover",
                    }}
                    width={48}
                  />
                  <div className="space-y-1">
                    <div className="text-sm font-medium group-hover:underline">
                      Mastering Serverless Deployment: Best Practices and
                      Strategies
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      May 20, 2024
                    </div>
                  </div>
                </Link>
                <Link
                  className="group grid grid-cols-[48px_1fr] gap-4 items-center"
                  href="#"
                >
                  <img
                    alt="Blog Post Image"
                    className="rounded-md"
                    height={48}
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "48/48",
                      objectFit: "cover",
                    }}
                    width={48}
                  />
                  <div className="space-y-1">
                    <div className="text-sm font-medium group-hover:underline">
                      Serverless Architectures: Revolutionizing the Way We Build
                      Web Applications
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      May 15, 2024
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#"
                >
                  Serverless
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#"
                >
                  Web Development
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#"
                >
                  Cloud Computing
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#"
                >
                  Architecture
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#"
                >
                  Scalability
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 w-full shrink-0">
        <div className="container px-4 md:px-6 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Acme Inc. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function FolderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0,0,256,256"
      style={{ fill: "#FFFFFF" }}
    >
      <g
        fill="#444444"
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
        style={{ mixBlendMode: "normal" }}
      >
        <g transform="scale(5.12,5.12)">
          <path d="M5,4c-1.64497,0 -3,1.35503 -3,3v9v2v25c0,1.64497 1.35503,3 3,3h40c1.64497,0 3,-1.35503 3,-3v-24v-3v-5c0,-1.64497 -1.35503,-3 -3,-3h-27c0.08657,0 -0.03101,0.00036 -0.27539,-0.28125c-0.24438,-0.28161 -0.54519,-0.74881 -0.85937,-1.25c-0.31418,-0.50119 -0.64346,-1.03596 -1.05859,-1.50586c-0.41514,-0.4699 -0.98789,-0.96289 -1.80664,-0.96289zM5,6h9c-0.06075,0 0.06114,0.00701 0.30859,0.28711c0.24746,0.2801 0.54864,0.74533 0.86133,1.24414c0.31269,0.49881 0.63651,1.03161 1.04297,1.5c0.40646,0.46839 0.96604,0.96875 1.78711,0.96875h27c0.56503,0 1,0.43497 1,1v2.1875c-0.31489,-0.11356 -0.64816,-0.1875 -1,-0.1875h-40c-0.35184,0 -0.68511,0.07394 -1,0.1875v-6.1875c0,-0.56503 0.43497,-1 1,-1zM5,15h40c0.56503,0 1,0.43497 1,1v3v24c0,0.56503 -0.43497,1 -1,1h-40c-0.56503,0 -1,-0.43497 -1,-1v-25v-2c0,-0.56503 0.43497,-1 1,-1z"></path>
        </g>
      </g>
    </svg>
  );
}
