import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  const body: UserType = await req.json();

  await connectDB();

  const hasDuplicate = await User.findOne({ username: body.username });
  console.log(hasDuplicate);

  if (hasDuplicate !== null) {
    // error code 409 -> Conflict
    return new Response("Username already exists.", { status: 409 });
  }

  await User.create({
    username: body.username,
    password: body.password,
    bio: "",
  });

  return new Response("New user signed up", { status: 200 });
}
