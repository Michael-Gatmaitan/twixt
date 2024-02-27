import { ObjectId } from "mongoose";

interface IOTPResult {
  message: string;
  athorize: boolean;
}

interface UserType {
  username: string;
  password: string;
  mongodbID: string;
  loggedIn: boolean;
  authorized: boolean;
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
  friendRequests: IFriendRequests[];
  friendRequestsSent: IFrRequestsSent[];
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

// Fr requests
interface IFriendRequests {
  _id: string;
  user1ID: string;
  createdAt: string;
}

interface IFrRequestsSent {
  _id: string;
  user2ID: string;
  createdAt: string;
}

// Friend requests fetch return TYPES
// interface FriendRequesters {

// }
