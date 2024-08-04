import Comment from "@/models/Comment";
import connectDB from "@/lib/mongodb";
import { NextRequest } from "next/server";
import Post from "@/models/Post";
import { verifySession } from "@/lib/dal";
import { logout } from "@/actions/auth";

// Create a comment to a post
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { formContent, suppID } = body;

  const userID = (await verifySession()).userID as string;
  if (!userID) await logout();

  await connectDB();

  if (userID === undefined || formContent === "")
    throw new Error("MongodbID or Post Content cannot be empty");

  // console.log(userID, formContent);

  const userNewComment = await Comment.create({
    userID: userID,
    postID: suppID,
    commentContent: formContent,
  });

  // Increment the commentCount by 1 of the post
  await Post.updateOne(
    { _id: suppID },
    {
      $inc: {
        commentCount: 1,
      },
    }
  );

  return new Response(JSON.stringify(userNewComment));
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const postID_params = searchParams.get("postID");

  try {
    await connectDB();

    const postComments = await Comment.find({ postID: postID_params });
    // console.log("Post comments in api: ", postComments);
    return new Response(JSON.stringify(postComments));
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ message: "Fetching comments failed." }),
      { status: 500 }
    );
  }
}
