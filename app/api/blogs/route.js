import connectToDatabase from "@/lib/db";
import BlogPost from "@/model/BlogModel";


export const dynamic = "force-dynamic";
export async function GET(request) {
  try {
    await connectToDatabase();
    const blog = await BlogPost.find();
    return Response.json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ status: "fail" });
  }
}
