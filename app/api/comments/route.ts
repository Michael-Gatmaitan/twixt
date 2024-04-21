import Comment from "@/models/Comment";
import connectDB from "@/lib/mongodb";
import { NextRequest } from "next/server";
import Post from "@/models/Post";

// Create a comment to a post
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { mongodbID, formContent, suppID } = body;

  await connectDB();

  if (mongodbID === undefined || formContent === "")
    throw new Error("MongodbID or Post Content cannot be empty");

  // console.log(mongodbID, formContent);

  const userNewComment = await Comment.create({
    userID: mongodbID,
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

  return new Response("Post req");
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
