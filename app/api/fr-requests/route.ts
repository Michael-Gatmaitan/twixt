import { NextRequest } from "next/server";
import Friendship from "@/models/Friendship";
import connectDB from "@/lib/mongodb";

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

interface PUTBodyType {
  friendshipID: string;
  response: "accepted" | "rejected";
}

// Accept or reject route handler
export async function PUT(req: NextRequest) {
  const body: PUTBodyType = await req.json();

  await connectDB();

  try {
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

    return new Response(JSON.stringify({ message: "updated" }), {
      status: 200,
    });
  } catch (err) {
    console.log("There was an error for updating friendship.", err);
    return new Response(JSON.stringify({ message: "error" }), { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const body: Pick<PUTBodyType, "friendshipID"> = await req.json();

  await connectDB();

  const deleteFriendship = await Friendship.deleteOne({
    _id: body.friendshipID,
  });

  console.log(deleteFriendship);
}
