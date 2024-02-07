import { IPost } from "@/app";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import mongoose from "mongoose";

// Get all USER_POSTS in database
export async function GET() {
  try {
    await connectDB();
    const posts: IPost[] = await Post.find();

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

  if (mongodbID === "" || postContent === "") {
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
