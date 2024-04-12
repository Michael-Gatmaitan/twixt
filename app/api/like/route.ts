import connectDB from "@/lib/mongodb";
import Like from "@/models/Like";
import { getCookie } from "cookies-next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const postID_params = searchParams.get("postID");

  await connectDB();

  // Return all likes for an specific post.
  if (postID_params !== null) {
    const postLikes = await Like.find({ postID: postID_params });
    return new Response(JSON.stringify(postLikes));
  }

  // else return all this user liked.
  const authID = getCookie("authorize");
  const allLikes = await Like.find({
    userID: authID,
  });

  return new Response(JSON.stringify(allLikes));
  // Get likes
}

export async function POST(req: NextRequest) {
  const body: { postID: string; userID: string } = await req.json();

  if (!body.postID || !body.userID) {
    return new Response(
      JSON.stringify({ message: "Error: postID or userID is undefined." }),
      {
        status: 500,
      }
    );
  }

  await connectDB();
  const newLike = await Like.create({
    postID: body.postID,
    userID: body.userID,
  });

  console.log("New like performed: ", newLike);

  return new Response(JSON.stringify({ message: "New like created." }), {
    status: 200,
  });
}
