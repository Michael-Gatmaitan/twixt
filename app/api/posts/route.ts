import { logout } from "@/actions/auth";
import { IPost } from "@/app";
import { verifySession } from "@/lib/dal";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// Get all USER_POSTS in database
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userID_params = searchParams.get("userID");
  const postID_params = searchParams.get("postID");

  // * If there's a postID in searchParams, return
  // * the specific post based in ID.

  try {
    await connectDB();

    if (userID_params !== null) {
      const specificUserPosts = await Post.find({
        userID: userID_params,
      });

      return new Response(JSON.stringify(specificUserPosts));
    }

    // console.log("postid params", postID_params);
    if (postID_params !== null) {
      console.log("Returning a specific post");

      const specificPost = await Post.findOne<IPost>({
        _id: postID_params,
      });
      return new Response(JSON.stringify(specificPost));
    }

    // const friendList: Pick<IFriendship, "user1ID">[] = await Friendship.find(
    //   // { user2ID: authID, status: "accepted" },
    //   { $or: [{ user2ID: authID }, { user1ID: authID }], status: "accepted" },
    //   { user1ID: 1 }
    // );

    // const flattenedFriendList = friendList.flatMap((friend) => friend.user1ID);

    // console.log(flattenedFriendList);

    // const posts: IPost[] = await Post.find({
    //   userID: { $in: flattenedFriendList },
    // }).limit(10);

    const posts: IPost[] = await Post.find();

    // console.log(friendList, "friend");
    return new Response(JSON.stringify(posts));
  } catch (err) {
    // console.log(err);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { formContent } = body;

  const userID = (await verifySession()).userID as string;
  if (!userID) await logout();

  await connectDB();

  if (userID === undefined || formContent === "") {
    console.log(userID, formContent);
    throw new Error("MongodbID or Post Content cannot be empty");
  }

  const userNewPost = await Post.create({
    userID: userID,
    postContent: formContent,
  });

  return new Response("Post req");
}
