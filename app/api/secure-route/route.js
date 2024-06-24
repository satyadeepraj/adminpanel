import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";
export async function GET(request) {

    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;
       
        if(!user){
            throw new Error('you are not authorized')
            
        } else return Response.json({user})
    } catch (error) {

        return new Response(JSON.stringify({error:error.message }), {
            status: 401,
            statusText:error.message,
            headers: { "Content-Type": "application/json" },
          })
    
    }
}