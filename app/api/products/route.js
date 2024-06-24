import connectToDatabase from "@/lib/db";
import Product from "@/model/ProductModel";


export const dynamic = "force-dynamic";
export async function GET(request) {
  try {
    await connectToDatabase();
    const product = await Product.find();
    return Response.json({
      status: "product",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ status: "fail" });
  }
}
