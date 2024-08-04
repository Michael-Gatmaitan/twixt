import { IFriendship } from "@/app";
import connectDB from "@/lib/mongodb";
import Friendship from "@/models/Friendship";
import { NextRequest } from "next/server";

// get all friends
/**
 * * By default, userID param should not be empty or null
 * * If you want:
 * *    to get all friends info, you only need [userID: string] param
 * *    to get only the friends count, add the [getFriendsCount: boolean]
 *
 * TODO: We need to sure that this GET func is reusable and easy to use!!!
 **/

// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams;
//   const userID = searchParams.get("userID");
//   const getOnlyCountOfFriends = searchParams.get("getFriendsCount");

//   if (userID === undefined || userID === "")
//     return new Response(JSON.stringify({ message: "UserID undefined" }));

//   await connectDB();

//   let friends: IFriendship[] = [];

//   try {
//     // * This will find all the friend of the provided userID
//     friends = await Friendship.find({
//       $or: [{ user1ID: userID }, { user2ID: userID }],
//       status: "accepted",
//     });

//     // If we want t oget the friend count only
//     if (getOnlyCountOfFriends === "true")
//       return new Response(JSON.stringify({ friendCount: friends.length }));

//     // friends.
//     const userFriendsID: string[] = [];

//     for (const friend of friends) {
//       const { user1ID, user2ID } = friend;
//       userFriendsID.push(user1ID !== userID ? user1ID : user2ID);
//     }

//     console.log(userFriendsID);

//     // If we want to get the information of friends
//     return new Response(JSON.stringify(friends));
//   } catch (err) {
//     return new Response(
//       JSON.stringify({ message: "Error in GET /api/friends" })
//     );
//   }
// }

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userID = searchParams.get("userID");

  try {
    await connectDB();

    const friends = await Friendship.find<IFriendship[]>({
      $or: [{ user1ID: userID }, { user2ID: userID }],
      status: "accepted",
    });

    console.log(friends);

    return new Response(JSON.stringify(friends));

    // return new Response(JSON.stringify({ message: "Problem occured" }), {
    //   status: 500,
    // });
  } catch (err) {
    console.log(`Problem occured in fetching friends of user ${userID}`);
    return new Response(JSON.stringify({ message: "Problem occured" }), {
      status: 500,
    });
  }
}
