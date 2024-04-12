import { IComment } from "@/app";
import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema<IComment>({
  userID: {
    type: String,
    required: [true, "MongodbID required"],
  },
  postID: {
    type: String,
    required: [true, "Post id in comment cannot be null"],
  },
  commentContent: {
    type: String,
    required: [true, "Comment content requiried"],
  },
  likeCount: {
    type: Number,
    required: [true, "Like count required"],
    default: 0,
  },
  replyCount: {
    type: Number,
    required: [true, "Reply count required"],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Comment =
  models.Comment || mongoose.model<IComment>("Comment", commentSchema);
export default Comment;
