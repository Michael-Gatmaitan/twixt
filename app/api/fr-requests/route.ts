import { NextRequest } from "next/server";
import Friendship from "@/models/Friendship";

export async function GET(req: NextRequest) {
  const mongodbid = req.cookies.get("authorize")?.value;
  console.log("mongoid in fr req route ", mongodbid);

  if (!mongodbid)
    return new Response(JSON.stringify({ message: "id not found" }), {
      status: 500,
    });

  const friendRequests = await Friendship.find(
    {
      user2ID: mongodbid,
      status: "pending",
    },
    { user1ID: 1, _id: 1, createdAt: 1 }
  );

  if (friendRequests) return new Response(JSON.stringify(friendRequests));

  // this means there's no friend-req user have recieved.
  return new Response(JSON.stringify([]));
}

export async function PUT(req: NextRequest) {
  const body: { friendshipID: string; response: "accepted" | "rejected" } =
    await req.json();
  console.log(body);

  const update = await Friendship.updateOne(
    {
      _id: body.friendshipID,
    },
    {
      $set: {
        status: body.response,
      },
    }
  );

  console.log(update);

  return new Response(JSON.stringify({ message: "hello" }), { status: 200 });
}
