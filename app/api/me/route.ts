import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: Request) {
  await connectDB();
  // let me: UserType | null = null;

  // me = await User.findOne({
  //   _id: ,
  // });

  // console.log(me);
  console.log("EHHEHEHHEHEH");

  return new Response(JSON.stringify({ message: "Hello" }), { status: 200 });
}
