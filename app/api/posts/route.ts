import { IPost } from "@/app";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// Get all USER_POSTS in database
export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const searchParams = req.nextUrl.searchParams;
  // const authID = cookieStore.get("authorize")?.value;
  const userID_params = searchParams.get("userID");
  const postID_params = searchParams.get("postID");
  // const type_params = searchParams.get("type");

  // * If there's a postID in searchParams, return
  // * the specific post based in ID.

  try {
    await connectDB();

    // if (authID === undefined) {
    //   return new Response(
    //     JSON.stringify({ message: "/posts: auth id undefined" }),
    //     { status: 500 }
    //   );
    // }

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
  const { mongodbID, formContent } = body;

  await connectDB();

  if (mongodbID === undefined || formContent === "") {
    console.log(mongodbID, formContent);
    throw new Error("MongodbID or Post Content cannot be empty");
  }

  const userNewPost = await Post.create({
    userID: mongodbID,
    postContent: formContent,
  });

  return new Response("Post req");
}
