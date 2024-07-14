import { IFriendship } from "@/app";
import { verifySession } from "@/lib/dal";
import connectDB from "@/lib/mongodb";
import Friendship from "@/models/Friendship";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // const cookieStore = cookies();
  // user1ID, user2ID
  const searchParams = req.nextUrl.searchParams;
  const user1ID = (await verifySession()).userID;
  const user2ID = searchParams.get("userID");

  let areYouTheRequestSender = false;

  await connectDB();
  const friendship: IFriendship | null = await Friendship.findOne({
    $or: [
      {
        user1ID: user1ID,
        user2ID: user2ID,
      },
      {
        user1ID: user2ID,
        user2ID: user1ID,
      },
    ],
  });

  if (friendship?.user1ID === user1ID) {
    areYouTheRequestSender = true;
  }

  console.log("Friendship", friendship);

  if (friendship) {
    console.log(`GET: Friendship with ${user2ID} found`);
  } else {
    console.log(`GET: No friendship found with ${user2ID}`);
    return new Response(
      JSON.stringify([
        null,
        {
          status: "no connection",
        },
      ])
    );
  }

  return new Response(JSON.stringify([areYouTheRequestSender, friendship]));
}

export async function POST(req: NextRequest) {
  // user1ID, user2ID
  // const cookieStore = cookies();
  const searchParams = req.nextUrl.searchParams;
  const user1ID = (await verifySession()).userID;
  const user2ID = searchParams.get("userID");

  if (!user1ID || !user2ID) {
    return new Response(
      JSON.stringify({ message: "User ids cannot be empty" }),
      { status: 500 }
    );
  }

  try {
    await connectDB();
    const friendship: IFriendship | null = await Friendship.findOne({
      user1ID: user1ID,
      user2ID: user2ID,
    });

    // * If friendship doesn't exists in database
    if (!friendship) {
      console.log("POST: creating new friendship");
      const newFriendship = await Friendship.create({
        user1ID: user1ID,
        user2ID: user2ID,
        status: "pending",
      });

      return new Response(JSON.stringify(newFriendship));
    }

    const updateFriendshipThatExists = await Friendship.updateOne(
      {
        user1ID: user1ID,
        user2ID: user2ID,
      },
      {
        $set: {
          status: "pending",
        },
      }
    );

    console.log(updateFriendshipThatExists);

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
