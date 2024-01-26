import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username required"],
    match: [/^[A-Za-z][A-Za-z0-9_]{6,29}$/, "Username should be unique."],
  },
  password: {
    type: String,
    required: [true, "Username required"],
  },
});

// Create model
const User = models.User || mongoose.model<UserType>("User", userSchema);

export default User;
