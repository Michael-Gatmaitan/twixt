import { verifySession } from "@/lib/dal";
import Friendship from "@/models/Friendship";
import { NextRequest } from "next/server";

// either cancel or not
export async function GET(req: NextRequest) {
  const mongodbid = (await verifySession()).userID;
  console.log("mongoid in fr req SENT route ", mongodbid);

  if (!mongodbid)
    return new Response(JSON.stringify({ message: "id not found" }), {
      status: 500,
    });

  const friendRequestsSent = await Friendship.find(
    {
      user1ID: mongodbid,
      status: "pending",
    },
    { user2ID: 1, _id: 1, createdAt: 1 }
  );

  console.log(friendRequestsSent);

  if (friendRequestsSent) {
    console.log(friendRequestsSent);

    return new Response(JSON.stringify(friendRequestsSent));
  }

  // this means there's no friend-request-sent user have.
  return new Response(JSON.stringify([]));
}

// We can only cancel friend requests we sent.
export async function PUT(req: NextRequest) {
  const body: { friendshipID: string } = await req.json();

  // Cancel request sent.
  // We will also delete this from database.
  try {
    const cancelRequest = await Friendship.deleteOne({
      _id: body.friendshipID,
    });
    console.log(cancelRequest);
    return new Response(
      JSON.stringify({ message: "Request deleted successfully" })
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: err }));
  }
}
