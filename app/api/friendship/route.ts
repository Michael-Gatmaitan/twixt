import { IFriendship } from "@/app";
import connectDB from "@/lib/mongodb";
import Friendship from "@/models/Friendship";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const cookieStore = cookies();
  // user1ID, user2ID
  const searchParams = req.nextUrl.searchParams;
  const user1ID = cookieStore.get("mongodbid")?.value;
  const user2ID = searchParams.get("userID");

  const friendship: IFriendship | null = await Friendship.findOne({
    user1ID: user1ID,
    user2ID: user2ID,
  });

  console.log(friendship);

  if (friendship) {
    console.log(`GET: Friendship with ${user2ID} found`);
  } else {
    console.log(`GET: No friendship found with ${user2ID}`);
    return new Response(
      JSON.stringify({
        status: "no connection",
      })
    );
  }

  return new Response(JSON.stringify(friendship));
}

export async function POST(req: NextRequest) {
  await connectDB();
  // user1ID, user2ID
  const cookieStore = cookies();
  const searchParams = req.nextUrl.searchParams;
  const user1ID = cookieStore.get("mongodbid")?.value;
  const user2ID = searchParams.get("userID");

  if (!user1ID || !user2ID) {
    return new Response(
      JSON.stringify({ message: "User ids cannot be empty" }),
      { status: 500 }
    );
  }

  try {
    const friendship: IFriendship | null = await Friendship.findOne({
      user1ID: user1ID,
      user2ID: user2ID,
    });

    if (!friendship) {
      console.log("POST: creating new friendship");
      const newFriendship = await Friendship.create({
        user1ID: user1ID,
        user2ID: user2ID,
        status: "pending",
      });

      return new Response(JSON.stringify(newFriendship));
    }

    console.log("POST: Friendship created in the past");

    return new Response(JSON.stringify(friendship));
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ message: `Friendship error: ${err}` }),
      { status: 500 }
    );
  }
}
