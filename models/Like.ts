import { ILike } from "@/app";
import mongoose, { Schema, models } from "mongoose";

const likeSchema = new Schema<ILike>({
  userID: {
    type: String,
    required: [true, "UserID required for liking a post"],
  },
  compID: {
    type: String,
    required: [true, "PostID required for liking a post"],
  },
  type: {
    type: String,
    required: [true, "Type of like is required"],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Like = models.Like || mongoose.model<ILike>("Like", likeSchema);
export default Like;
