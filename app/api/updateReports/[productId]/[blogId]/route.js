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

export async function PUT(request, { params }) {
  await connectToDatabase();
  const parser = new DatauriParser();
  const formData = await request.formData();
  const { blogId } = params;
  const email = formData.get("email");
  const documentype = formData.get("documentype");
  const documentversion = formData.get("documentversion");
  const dateOfReport = new Date(formData.get("dateOfReport"));
  const maintitle = formData.get("maintitle");
  const maincontent = formData.get("maincontent");
  const datePublished = new Date(formData.get("datePublished"));
  const status = formData.get("status");
  const productId = formData.get("productId");

  const author = JSON.parse(formData.get("author"));

  const image1 = formData.get("image1");
  const image2 = formData.get("image2");
  const image3 = formData.get("image3");
  const image4 = formData.get("image4");
  const imageFiles = [image1, image2, image3, image4].filter(Boolean);
  const existingImage1 = formData.get("existingImage1");
  const sections = [];

  formData.forEach((value, key) => {
    const sectionMatch = key.match(
      /^sections\[(\d+)]\[(vulnerability|severity|images)](\[\d+\])?$/
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
    } else if (existingImage1) {
      cloudinaryUrls = [existingImage1];
    }

    const sectionUploadPromises = sections.map(
      async (section, sectionIndex) => {
        const sectionImageUploadPromises = section.images.map(
          async (imageFile, imageIndex) => {
            if (typeof imageFile === "string") {
              // If it's an existing image URL, keep it
              return imageFile;
            } else {
              // Upload new image
              const buffer = Buffer.from(await imageFile.arrayBuffer());
              const file64 = parser.format(imageFile.name, buffer);
              const result = await cloudinary.uploader.upload(file64.content, {
                resource_type: "auto",
                folder: "nextauth_sections", // optional folder for sections
              });
              return result.secure_url;
            }
          }
        );

        const sectionImageUrls = await Promise.all(sectionImageUploadPromises);
        sections[sectionIndex].images = sectionImageUrls;
      }
    );

    await Promise.all(sectionUploadPromises);

    console.log(
      {
        email,
        documentype,
        documentversion,
        dateOfReport,
        maintitle,
        maincontent,
        status,
        datePublished,
        images: cloudinaryUrls || [],
        author,
        sections,
      },
      "line no.108api********************************",
      blogId
    );

    const updatedBlog = await BlogPost.findOneAndUpdate(
      { _id: blogId },
      {
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
      },
      { upsert: true }
    );
    console.log(updatedBlog, "********************************line126 api");
    return Response.json({
      status: "success",
      data: updatedBlog,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ status: "fail" });
  }
}

export async function DELETE(request, { params }) {
  await connectToDatabase();
  console.log(params);
  const { searchParams } = new URL(request.url);
  console.log(searchParams);
  const { blogId } = params;
  const { productId } = params;
  console.log(`Received blogId: ${blogId}, productId: ${productId}`);
  if (!blogId || !productId) {
    return new Response(
      JSON.stringify({
        status: "fail",
        message: "Missing blogId or productId",
      }),
      { status: 400 }
    );
  }
  try {
    // Find and delete the blog post
    const deletedBlog = await BlogPost.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return new Response(
        JSON.stringify({ status: "fail", message: "Blog post not found" }),
        { status: 404 }
      );
    }

    // Find the associated product
    const product = await Product.findById(productId);
    if (product) {
      // Filter out the deleted blog ID from the product's reports array
      const initialReportsLength = product.reports.length;
      product.reports = product.reports.filter(
        (report) => report.blogId.toString() !== blogId
      );

      // Save the updated product only if there was a change
      if (product.reports.length !== initialReportsLength) {
        await product.save();
      } else {
        console.log("Blog ID was not found in product reports array");
      }
    }

    return new Response(
      JSON.stringify({ status: "success", message: "Blog post deleted" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ status: "fail", message: error.message }),
      { status: 500 }
    );
  }
}
