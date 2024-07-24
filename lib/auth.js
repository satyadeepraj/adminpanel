import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import User from "@/model/userModel";
import connectToDatabase from "@/lib/db";
import Product from "@/model/ProductModel";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async session({ session, token }) {
      if (token.userRole === "product") {
        session.productId = token.productId;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user?.productId) {
        token.userRole = "product";
        token.productId = user.productId;
      } else {
        token.userRole = "user";
      }
      return token;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToDatabase();
        const user = await User.findOne({ email: credentials?.email }).select(
          "+password"
        );

        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );
        if (passwordCorrect) {
          return {
            email: user.email,
            name: user.name,
            image: user._id,
          };
        }
        return null;
      },
    }),
    // Product Credentials Provider
    CredentialsProvider({
      id: "product-credentials",
      name: "Product Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToDatabase();
        const product = await Product.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!product) {
          throw new Error("No product found with the given email");
        }

        const passwordCorrect = await compare(
          credentials?.password || "",
          product.password
        );

        if (passwordCorrect) {
          return {
            email: product.email,
            name: product.projectName,
            productId: product._id,
          };
        }
        return null;
      },
    }),
  ],
};
