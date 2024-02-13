import { ObjectId } from "mongoose";

interface UserType {
  username: string;
  password: string;
  mongodbID: string;
  loggedIn: boolean;
}

interface IUserValidation {
  username: string;
  password: string;
}

interface IUser {
  _id: string;
  username: string;
  password: string;
  bio: string;
  status: string;
  createdAt: Date;
}

interface IStates {
  showSidebar: boolean;
  showLogoutModal: boolean;
}

interface IPost {
  _id: string;
  userID: string;
  postContent: string;
  createdAt: Date;
}

interface IFriendship {
  _id: string;
  user1ID: string;
  user2ID: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}
