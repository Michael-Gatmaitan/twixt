import { ILike } from "@/app";
import mongoose, { Schema, models } from "mongoose";

const likeSchema = new Schema<ILike>({
  userID: {
    type: String,
    required: [true, "UserID required for liking a post"],
  },
  postID: {
    type: String,
    required: [true, "PostID required for liking a post"],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Like = models.Like || mongoose.model<ILike>("Like", likeSchema);
export default Like;
