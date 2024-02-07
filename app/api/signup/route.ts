import { UserType } from "@/app";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body: UserType = await req.json();

  await connectDB();

  const hasDuplicate = await User.findOne({ username: body.username });
  console.log(hasDuplicate);

  if (hasDuplicate) {
    // error code 409 -> Conflict
    return new Response("Username already exists.", { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await User.create({
    username: body.username,
    password: hashedPassword,
    bio: "Put some bio here",
    status: "Active",
  });

  console.log(newUser);

  return new Response("New user signed up", { status: 200 });
}
