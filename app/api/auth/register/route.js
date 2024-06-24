import User from "@/model/userModel";
import connectToDatabase from "@/lib/db";

export const dynamic = "force-dynamic";
export async function POST(request) {
  try {
    await connectToDatabase();
    const { name, email, password, confirmPassword, role } =
      await request.json();

    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
      role,
    });
    return Response.json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      return new Response(
        JSON.stringify({ error: "Email is already taken." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
          statusText: "Email is already taken",
        }
      );
    } else {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
        statusText: "Email is already taken",
      });
    }
  }
}
