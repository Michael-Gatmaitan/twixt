import { NextRequest } from "next/server";

// Create a reply to a comment
import connectDB from "@/lib/mongodb";
import Reply from "@/models/Reply";
import Comment from "@/models/Comment";
import { verifySession } from "@/lib/dal";
import { logout } from "@/actions/auth";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const commentID_params = searchParams.get("commentID");

  if (commentID_params === null)
    return new Response(
      JSON.stringify({
        message: "CommentID param required to get reply data.",
      }),
      { status: 500 }
    );

  try {
    await connectDB();

    const repliesResult = await Reply.find({ commentID: commentID_params });
    console.log(`Reply result in commentID=${commentID_params}`, repliesResult);
    return new Response(JSON.stringify(repliesResult));
  } catch (err) {
    console.log("Error in GET api/reply: ", err);
  }
}

// Create a reply to a comment
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { formContent, suppID } = body;

  const userID = (await verifySession()).userID as string;
  if (!userID) await logout();

  await connectDB();

  if (userID === undefined || formContent === "") {
    console.log(userID, formContent);
    throw new Error("MongodbID or Reply Content cannot be empty");
  }

  const userNewReply = await Reply.create({
    userID: userID,
    commentID: suppID,
    replyContent: formContent,
  });

  // Increment replyCount of the comment.
  await Comment.updateOne(
    { _id: suppID },
    {
      $inc: {
        replyCount: 1,
      },
    }
  );

  console.log(userNewReply);

  return new Response(JSON.stringify(userNewReply));
}
