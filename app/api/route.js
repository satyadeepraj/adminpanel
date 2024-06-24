import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import User from "@/model/userModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.image;

    await connectToDatabase();
    const user = await User.findById(userId);

    // Exclude password from user object
    const { password, ...userWithoutPassword } = user.toObject();

    return NextResponse.json({ currentUser: userWithoutPassword });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
