import { IUser } from "@/app";
import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Username required"],
    unique: true,
    minlength: 6,
    match: [/^[A-Za-z][A-Za-z0-9_]{6,29}$/, "Username should be unique."],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Password required"],
  },
  bio: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  profileImageSrc: {
    type: String,
    required: true,
    default:
      "https://lastfm.freetls.fastly.net/i/u/770x0/043ab1adfe3f4881b8bdc12a9ababe60.jpg#043ab1adfe3f4881b8bdc12a9ababe60",
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

// Create model
const User = models.User || mongoose.model<IUser>("User", userSchema);

export default User;
