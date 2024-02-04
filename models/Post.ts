import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema({
  mongodbID: {
    type: String,
    required: [true, "MongodbID required"],
  },
  postContent: {
    type: String,
    required: [true, "Post content requiried"],
  },
});

const Post =
  models.Post ||
  mongoose.model<{ mongodbID: string; postContent: string }>(
    "Post",
    postSchema
  );
export default Post;
