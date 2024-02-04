import connectDB from "@/lib/mongodb";
import { setMongodbID } from "@/lib/slices/userSlice";
import Post from "@/models/Post";

export async function POST(req: Request) {
  const body = await req.json();
  const { mongodbID, postContent } = body;

  console.log(body);

  await connectDB();

  if (mongodbID === "" || postContent === "") {
    throw new Error("MongodbID or Post Content cannot be empty");
  }

  await Post.create({
    mongodbID,
    postContent,
  });

  return new Response("Post req");
}
