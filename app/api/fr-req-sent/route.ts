import Friendship from "@/models/Friendship";
import { NextRequest } from "next/server";

// either cancel or not
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const mongodbid = searchParams.get("userID");

  if (mongodbid === undefined)
    return new Response(
      JSON.stringify({ message: "FR SENT: mongodbid not found" }),
      {
        status: 500,
      }
    );

  console.log("mogno", mongodbid);

  const friendRequestsSent = await Friendship.find({
    user1ID: mongodbid,
    // status: "pending",
  });

  console.log(friendRequestsSent);

  if (friendRequestsSent) {
    console.log(friendRequestsSent);

    return new Response(JSON.stringify(friendRequestsSent));
  }

  // this means there's no friend-request-sent user have.
  return new Response(JSON.stringify([]));
}
