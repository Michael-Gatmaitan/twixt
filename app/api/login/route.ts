import User from "@/models/User";
import connectDB from "@/lib/mongodb";

export async function POST(req: Request) {
  await connectDB();

  const body: UserType = await req.json();

  const userAccount = await User.findOne({
    username: body.username,
    password: body.password,
  });

  console.log(userAccount);

  if (userAccount === null) {
    return new Response(JSON.stringify({ message: "Account do not exist" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(userAccount), { status: 200 });
}
