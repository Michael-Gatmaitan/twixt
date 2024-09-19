import { NextRequest } from "next/server";
import { verifySession } from "@/lib/dal";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { IUser } from "@/app";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  const { userID } = await verifySession();
  const newProfileImageSrc = req.nextUrl.searchParams.get("profileImageSrc");

  if (userID === null) {
    return new Response(JSON.stringify("UserID not defined"));
  }

  await connectDB();

  const updatedProfile = await User.updateOne(
    { _id: userID },
    { profileImageSrc: newProfileImageSrc },
  );

  console.log(updatedProfile);

  if (updatedProfile.modifiedCount !== 0) {
    // redirect("/me");
    return new Response(JSON.stringify({ message: "success" }));
  } else {
    return new Response(JSON.stringify({ message: "failed" }));
  }
}

export async function GET() {
  const { userID } = await verifySession();

  await connectDB();
  const user: IUser | null = await User.findOne({ _id: userID });

  try {
    const profileImageSrc = user?.profileImageSrc;

    return new Response(JSON.stringify(profileImageSrc));
  } catch (err) {
    return new Response(JSON.stringify({ message: `Error occured: ${err}` }));
  }
}
