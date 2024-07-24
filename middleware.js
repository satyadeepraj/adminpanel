import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default withAuth(async (req) => {
  const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const pathname = req.nextUrl.pathname;

  // Define role-based access
  const userRoutes = [
    "/",
    "/addProducts",
    "/report-list",
    "/allBlogs",
    "/editprojects/:path*",
    "/editReports/:path*",
    "/profile",
    "/report-list/:path*",
  ];

  const productRoutes = [
    "/client/project/:path*",
    "/client-AllReports/:path*",
    "/client-profile",
    "/client-report-details/:path*",
  ];

  if (
    token.userRole === "user" &&
    productRoutes.some((route) =>
      new RegExp(`^${route.replace(/:path\*/, ".*")}$`).test(pathname)
    )
  ) {
    return NextResponse.redirect(new URL("/Client-unauthorized", req.url));
  }

  if (
    token.userRole === "product" &&
    userRoutes.some((route) =>
      new RegExp(`^${route.replace(/:path\*/, ".*")}$`).test(pathname)
    )
  ) {
    return NextResponse.redirect(new URL("/Admin-unauthorized", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/",
    "/addProducts",
    "/report-list",
    "/allBlogs",
    "/editprojects/:path*",
    "/editReports/:path*",
    "/profile",
    "/report-list/:path*",
    "/client/project/:path*",
    "/client-AllReports/:path*",
    "/client-profile",
    "/client-report-details/:path*",
  ],
};
