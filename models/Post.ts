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
  likeCount: {
    type: Number,
    required: [true, "Like count required"],
    default: 0,
  },
  commentCount: {
    type: Number,
    required: [true, "Comment count in post needed"],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Post = models.Post || mongoose.model<IPost>("Post", postSchema);
export default Post;
