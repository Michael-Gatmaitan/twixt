import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import Friendship from "@/models/Friendship";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const mongodbid = searchParams.get("userID");

  if (!mongodbid)
    return new Response(
      JSON.stringify({ message: "FR REQ: mongodbid not found" }),
      {
        status: 500,
      }
    );

  const friendRequests = await Friendship.find({
    user2ID: mongodbid,
    status: "pending",
  });

  if (friendRequests) {
    console.log(friendRequests);

    // Return list of users
    // const requestSenders = friendRequests;
    return new Response(JSON.stringify(friendRequests));
  }

  // this means there's no friend-req user have recieved.
  return new Response(JSON.stringify([]));
}
