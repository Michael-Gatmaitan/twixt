import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { CookieIcon, User } from "lucide-react";
import Friendship from "@/models/Friendship";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const urlHasParams = searchParams.size !== 0;

  const cookieStore = cookies();

  const mongodbid = cookieStore.get("mongodbid");

  console.log(`${mongodbid} mongoooo`);

  if (!mongodbid)
    return new Response(JSON.stringify({ message: "mongodbid not found" }), {
      status: 500,
    });

  const friendRequests = await Friendship.find({
    user1ID: mongodbid,
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
