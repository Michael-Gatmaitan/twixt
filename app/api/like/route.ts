import connectDB from "@/lib/mongodb";
import Comment from "@/models/Comment";
import Like from "@/models/Like";
import Post from "@/models/Post";
import Reply from "@/models/Reply";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const compID_params = searchParams.get("compID");
  const authID_params = searchParams.get("authID");
  const doesUserLiked_params = searchParams.get("doesUserLiked");

  await connectDB();

  console.log("Like route");

  // Return all likes for an specific post.
  if (compID_params !== null) {
    if (doesUserLiked_params !== null) {
      const res = await Like.find({
        compID: compID_params,
        userID: authID_params,
      });

      console.log(res, compID_params, authID_params);
      console.log("Checking if does user already liked the component");

      return new Response(JSON.stringify(res));
    }

    const postLikes = await Like.find({ postID: compID_params });
    return new Response(JSON.stringify(postLikes));
  }

  // else return all this user liked.
  const allLikes = await Like.find({
    userID: authID_params,
  });

  return new Response(JSON.stringify(allLikes));
}

export async function POST(req: NextRequest) {
  const body: { compID: string; userID: string; type: string } =
    await req.json();

  if (!body.compID || !body.userID) {
    return new Response(
      JSON.stringify({ message: "Error: postID or userID is undefined." }),
      {
        status: 500,
      }
    );
  }

  await connectDB();
  const newLike = await Like.create({
    compID: body.compID,
    userID: body.userID,
    type: body.type,
  });

  if (body.type === "post") {
    await Post.updateOne(
      {
        _id: body.compID,
      },
      {
        $inc: {
          likeCount: 1,
        },
      }
    );
  } else if (body.type === "comment") {
    await Comment.updateOne(
      {
        _id: body.compID,
      },
      {
        $inc: {
          likeCount: 1,
        },
      }
    );
  } else {
    await Reply.updateOne(
      {
        _id: body.compID,
      },
      {
        $inc: {
          likeCount: 1,
        },
      }
    );
  }

  console.log("New like performed: ", newLike);

  return new Response(JSON.stringify({ message: "New like created." }), {
    status: 200,
  });
}

interface IDeleteBody {
  type: "post" | "comment" | "reply";
  compID: string;
  userID: string;
}

export async function DELETE(req: NextRequest) {
  const body: IDeleteBody = await req.json();

  const deleteLike = await Like.deleteOne({
    compID: body.compID,
    userID: body.userID,
  });

  if (body.type === "post") {
    await Post.updateOne({ _id: body.compID }, { $inc: { likeCount: -1 } });
  }

  console.log("Deleting like: ", deleteLike.acknowledged);

  if (deleteLike.acknowledged)
    return new Response(JSON.stringify({ message: "Like has been removed." }));

  return new Response(
    JSON.stringify({ message: "Like has not been removed." }),
    { status: 500 }
  );
}
