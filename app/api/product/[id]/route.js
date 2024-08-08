import connectToDatabase from "@/lib/db";
import { getServerSession } from "next-auth";
import { Buffer } from "buffer";
import DatauriParser from "datauri/parser";
import cloudinary from "cloudinary";
import Product from "@/model/ProductModel";
import { authOptions } from "@/lib/auth";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";

export async function PUT(request, { params }) {
  await connectToDatabase();
  const parser = new DatauriParser();
  const formData = await request.formData();

  const productId = params.id; // Assuming you send productId in the request

  // Retrieve updated data from form
  const companyName = formData.get("companyName");
  const projectName = formData.get("projectName");
  const scopeUrl = formData.get("scopeUrl");
  const type = formData.get("type");
  const startDate = new Date(formData.get("startDate"));
  const endDate = new Date(formData.get("endDate"));
  const email = formData.get("email");
  const password = formData.get("password");

  const image1 = formData.get("image1");
  const existingImage1 = formData.get("existingImage1");
  const imageFiles = [image1].filter(Boolean);

  try {
    let cloudinaryUrls = [];

    // Upload new images to Cloudinary if any
    if (imageFiles.length > 0) {
      const uploadPromises = imageFiles.map(async (imageFile) => {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const dataUri = parser.format(imageFile.name, buffer);
        const result = await cloudinary.v2.uploader.upload(dataUri.content, {
          folder: "nextauth_products",
        });
        return result.secure_url;
      });

      cloudinaryUrls = await Promise.all(uploadPromises);
    } else {
      cloudinaryUrls = [existingImage1];
    }

    const updateData = {
      companyName,
      projectName,
      scopeUrl,
      type,
      startDate,
      endDate,
      email,
      images: cloudinaryUrls || [],
    }
    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }
    // Find the existing product by productId and update it
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return new Response(
        JSON.stringify({ status: "fail", message: "Product not found" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    return new Response(
      JSON.stringify({
        status: "success",
        data: updatedProduct,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ status: "fail", message: error.message }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(
        JSON.stringify({ status: "fail", message: "Unauthorized" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    const userId = session.user.id;
    const productId = params.id;

    console.log("User ID:", userId);
    console.log("Product ID:", productId);

    const result = await Product.deleteOne({ _id: productId, userId });
    console.log("Delete Result:", result);

    if (result.nModified === 0) {
      return new Response(
        JSON.stringify({ status: "Product not found or not deleted" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    return new Response(
      JSON.stringify({ status: "Product deleted successfully" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        status: "fail",
        message: error.message,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
