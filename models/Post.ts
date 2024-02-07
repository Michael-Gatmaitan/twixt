import { IPost } from "@/app";
import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema<IPost>({
  userID: {
    type: String,
    required: [true, "MongodbID required"],
  },
  postContent: {
    type: String,
    required: [true, "Post content requiried"],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Post = models.Post || mongoose.model<IPost>("Post", postSchema);
export default Post;
