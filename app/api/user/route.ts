import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest, res: Response) {
  const searchParams = req.nextUrl.searchParams;
  const userIDq = searchParams.get("userID");

  await connectDB();
  try {
    if (!userIDq) {
      return new Response(JSON.stringify({ message: "No user detected" }), {
        status: 500,
      });
    }

    console.log(`query:? ${userIDq}`);

    const user = await User.findOne({
      _id: userIDq,
    });

    if (!user)
      return new Response(JSON.stringify({ message: "No user detected" }), {
        status: 500,
      });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.log(`error: ${err}`);
    return new Response(JSON.stringify("No user"), { status: 200 });
  }
}
