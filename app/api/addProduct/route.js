import connectToDatabase from "@/lib/db";
import { Buffer } from "buffer";
import DatauriParser from "datauri/parser";
import cloudinary from "cloudinary";
import Product from "@/model/ProductModel";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";

export async function POST(request) {
  await connectToDatabase();
  const parser = new DatauriParser();
  const formData = await request.formData();

  const companyName = formData.get("companyName");
  const projectName = formData.get("projectName");
  const scopeUrl = formData.get("scopeUrl");
  const type = formData.get("type");
  const startDate = new Date(formData.get("startDate"));
  const endDate = new Date(formData.get("endDate"));
  const email= formData.get("email");
  const password=formData.get("password")
  


  const image1 = formData.get("image1");
  // const image2 = formData.get("image2");
  // const image3 = formData.get("image3");
  // const image4 = formData.get("image4");
  const imageFiles = [image1].filter(Boolean);

  try {
    const uploadPromises = imageFiles.map(async (imageFile) => {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const file64 = parser.format(imageFile.name, buffer);
      const result = await cloudinary.uploader.upload(file64.content, {
        resource_type: "auto",
      });
      return result.secure_url;
    });

    const cloudinaryUrls = await Promise.all(uploadPromises);

    const newProduct = await Product.create({
      companyName,
      projectName,
      scopeUrl,
      type,
      startDate,
      endDate,
      email,
      password,
      images: cloudinaryUrls || [],
     
    });

    return new Response(JSON.stringify({
      status: "success",
      data: newProduct,
    }), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: "fail" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
