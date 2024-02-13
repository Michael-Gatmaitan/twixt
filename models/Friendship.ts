import { IFriendship } from "@/app";
import mongoose, { Schema, models } from "mongoose";

const friendshipSchema = new Schema<IFriendship>({
  user1ID: {
    type: String,
    required: true,
  },
  user2ID: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Friendship =
  models.Friendship ||
  mongoose.model<IFriendship>("Friendship", friendshipSchema);

export default Friendship;
