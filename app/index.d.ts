import { Stringifier } from "postcss";

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
  authProcessing: boolean;
}

interface IPost {
  _id: string;
  userID: string;
  postContent: string;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
}

interface IComment {
  _id: string;
  userID: string;
  postID: string;
  commentContent: string;
  likeCount: number;
  replyCount: number;
  createdAt: Date;
}

interface IReply {
  _id: string;
  userID: string;
  commentID: string;
  replyContent: string;
  likeCount: number;
  createdAt: Date;
}

interface IFriendship {
  _id: string;
  user1ID: string;
  user2ID: string;
  status: "pending" | "accepted" | "rejected" | "no connection" | "";
  createdAt: Date;
}

interface ILike {
  _id: string;
  userID: string;
  compID: string;
  type: "post" | "comment" | "reply";
  createdAt: Date;
}

// Fr requests
interface IFriendRequests {
  _id: string;
  user1ID: string;
  createdAt: string;
  message?: string;
}

export interface IFrRequestsSent {
  _id: string;
  user2ID: string;
  createdAt: string;
}

// Friend requests fetch return TYPES
// interface FriendRequesters {

// }
