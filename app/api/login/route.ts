import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import { IUser, UserType } from "@/app";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import { setCookie } from "cookies-next";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // const res = new NextResponse();

  await connectDB();
  const cookieStore = cookies();

  try {
    const { username, password }: UserType = await req.json();

    const userAccount = (await User.findOne({
      username: username,
    })) as IUser;

    if (!userAccount)
      return new Response(
        JSON.stringify({ message: "Accoun t do not exist" }),
        {
          status: 404,
        }
      );

    const isPasswordValid = await bcrypt.compare(
      password,
      userAccount.password
    );

    if (!isPasswordValid)
      return new Response(
        JSON.stringify({ message: "Invalid credentials (wrong password)" }),
        {
          status: 400,
        }
      );

    const token = jwt.sign(
      { userID: userAccount._id },
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      { expiresIn: "1h" }
    );

    // cookieStore.set("mongodbid", userAccount._id, {
    //   maxAge: 60 * 60 * 24 * 2 * 60,
    //   path: "/",
    // });

    return new Response(JSON.stringify(userAccount), { status: 200 });
  } catch (err) {
    console.log("There was a problem on api/login: ", err);

    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 400,
    });
  }
}
