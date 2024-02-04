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

interface IStates {
  showSidebar: boolean;
  showLogoutModal: boolean;
}

interface IPost {
  _id: string;
  userID: string;
  postContent: string;
}

interface IFriendship {
  _id: string;
  user1ID: string;
  user2ID: string;
  status: "pending" | "accepted" | "rejected";
}
