import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import Friendship from "@/models/Friendship";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const urlHasParams = searchParams.size !== 0;

  const mongodbid = req.cookies.get("authorize")?.value;
  // const mongodbid = getCookie("authorize");

  console.log(`${mongodbid} mongoooo`);

  if (!mongodbid)
    return new Response(JSON.stringify({ message: "mongodbid not found" }), {
      status: 500,
    });

  const friendRequests = await Friendship.find({
    user2ID: mongodbid,
    status: "pending",
  });

  console.log(urlHasParams);

  if (friendRequests) {
    console.log(friendRequests);

    // Return list of users
    // const requestSenders = friendRequests;
    return new Response(JSON.stringify(friendRequests));
  }

  return new Response(JSON.stringify([]));
}
