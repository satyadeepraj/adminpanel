import connectToDatabase from "@/lib/db";
import { Buffer } from "buffer";
import DatauriParser from "datauri/parser";
import cloudinary from "cloudinary";
import BlogPost from "@/model/BlogModel";
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
  const email = formData.get("email");
  const documentype = formData.get("documentype");
  const documentversion = formData.get("documentversion");
  const dateOfReport = new Date(formData.get("dateOfReport"));
  const maintitle = formData.get("maintitle");
  const maincontent = formData.get("maincontent");
  const datePublished = new Date(formData.get("datePublished"));
  const productId = formData.get("productId");
  const status = formData.get("status");
  const author = JSON.parse(formData.get("author"));

  const image1 = formData.get("image1");
 
  const imageFiles = [image1].filter(Boolean);

  const sections = [];

  formData.forEach((value, key) => {
    const sectionMatch = key.match(
      /^sections\[(\d+)]\[(vulnerability|severity|status|images)](\[\d+\])?$/
    );
    if (sectionMatch) {
      const index = parseInt(sectionMatch[1]);
      const field = sectionMatch[2];
      const contentIndex = sectionMatch[3]
        ? parseInt(sectionMatch[3].match(/\[(\d+)\]/)[1])
        : 0;

      sections[index] = sections[index] || {
        vulnerability: "",
        severity: "",
        status:"Open",
        images: [],
      };
      if (field === "images") {
        sections[index][field][contentIndex] = value;
      } else {
        sections[index][field] = value;
      }
    }
  });

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

    const sectionUploadPromises = sections.map(
      async (section, sectionIndex) => {
        const sectionImageUploadPromises = section.images.map(
          async (imageFile, imageIndex) => {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const file64 = parser.format(imageFile.name, buffer);
            const result = await cloudinary.uploader.upload(file64.content, {
              resource_type: "auto",
            });
            return result.secure_url;
          }
        );

        const sectionImageUrls = await Promise.all(sectionImageUploadPromises);
        sections[sectionIndex].images = sectionImageUrls;
      }
    );

    await Promise.all(sectionUploadPromises);

    const newBlog = await BlogPost.create({
      email,
      documentype,
      documentversion,
      dateOfReport,
      status,
      maintitle,
      maincontent,
      datePublished,
      images: cloudinaryUrls || [],
      author,
      sections,
    });

    const product = await Product.findById(productId);
    console.log(product, newBlog._id, newBlog._id.toString());
    if (!product) {
      // Handle case where product with given ID is not found
      return Response.json({ status: "fail", message: "Product not found" });
    }

    // Now you can safely push the new blog ID into the reports array
    product.reports.push({ blogId: newBlog._id.toString() });

    // Save the updated product
    const updatedProduct = await product.save();

    return Response.json({
      status: "success",
      data: newBlog,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ status: "fail" });
  }
}
