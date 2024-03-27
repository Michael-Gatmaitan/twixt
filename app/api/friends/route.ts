import connectDB from "@/lib/mongodb";
import Friendship from "@/models/Friendship";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// get all friends
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const authID = cookies().get("authorize");
  // const frStatus = searchParams.get("status");

  // if (frStatus === null) return new Error("status params is empty");

  // console.log("Status requested: ", frStatus);

  await connectDB();

  const friends = await Friendship.find({
    $or: [
      {
        user1ID: authID,
      },
      {
        user2ID: authID,
      },
    ],
    status: "accepted",
  });

  console.log(friends);

  return new Response(JSON.stringify(friends));
}
