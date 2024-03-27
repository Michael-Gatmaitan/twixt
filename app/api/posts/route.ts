import { IFriendship, IPost } from "@/app";
import connectDB from "@/lib/mongodb";
import Friendship from "@/models/Friendship";
import Post from "@/models/Post";
import { cookies } from "next/headers";

// Get all USER_POSTS in database
export async function GET() {
  const cookieStore = cookies();
  const authID = cookieStore.get("authorize")?.value;

  try {
    await connectDB();

    if (authID === undefined) {
      return new Response(
        JSON.stringify({ message: "/posts: auth id undefined" }),
        { status: 500 }
      );
    }

    const friendList: Pick<IFriendship, "user1ID">[] = await Friendship.find(
      // { user2ID: authID, status: "accepted" },
      { $or: [{ user2ID: authID }, { user1ID: authID }], status: "accepted" },
      { user1ID: 1 }
    );

    const flattenedFriendList = friendList.flatMap((friend) => friend.user1ID);

    console.log(flattenedFriendList);

    // const posts: IPost[] = await Post.find({
    //   userID: { $in: flattenedFriendList },
    // }).limit(10);
    const posts: IPost[] = await Post.find();

    console.log(friendList, "friend");

    return new Response(JSON.stringify(posts));
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { mongodbID, postContent } = body;

  console.log(body);

  await connectDB();

  if (mongodbID === undefined || postContent === "") {
    console.log(mongodbID, postContent);
    throw new Error("MongodbID or Post Content cannot be empty");
  }

  const userNewPost = await Post.create({
    userID: mongodbID,
    postContent,
  });

  console.log(userNewPost);

  return new Response("Post req");
}
