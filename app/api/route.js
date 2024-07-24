import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Product from "@/model/ProductModel";
import User from "@/model/userModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.image;
    const userEmail = session?.user?.email;

    if (!userId && !userEmail) {
      return NextResponse.json({ error: "User not authenticated" });
    }

    await connectToDatabase();

    if (userId) {
    const user = await User.findById(userId);
    if (user) {
      // Exclude password from user object
      const { password, ...userWithoutPassword } = user.toObject();

      return NextResponse.json({ currentUser: userWithoutPassword, role:"user" });
    }
  }
  if (userEmail) {
    // Try to find the product by email if user is not found
    const product = await Product.findOne({ email: userEmail });
    if (product) {
      // Exclude password from product object
      const { password, ...productWithoutPassword } = product.toObject();
      return NextResponse.json({ currentProduct: { ...productWithoutPassword, _id: product._id },role:"product" });
    }
  }
  
    // If neither user nor product is found
    return NextResponse.json({ error: "User or Product not found" });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
