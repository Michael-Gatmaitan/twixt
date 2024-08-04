import { IReply } from "@/app";
import mongoose, { Schema, models } from "mongoose";

const replySchema = new Schema<IReply>({
  userID: {
    type: String,
    required: [true, "MongodbID required"],
  },
  commentID: {
    type: String,
    required: [true, "Comment id in reply cannot be null"],
  },
  replyContent: {
    type: String,
    required: [true, "Reply content requiried"],
  },
  likeCount: {
    type: Number,
    required: [true, "Like count required"],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Reply = models.Reply || mongoose.model<IReply>("Reply", replySchema);
export default Reply;
