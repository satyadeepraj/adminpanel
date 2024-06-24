import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import User from "@/model/userModel";
import connectToDatabase from "@/lib/db";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
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
        const user = await User.findOne({ email: credentials?.email }).select('+password');

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
  ],
};
