// TODO: 1. Get the user details using user/userID=***
// TODO: 1. Get the user friends using friends/userID=***

import UserDetails from "./UserDetails";
import UserFriends from "./UserFriends";
import UserFriendshipButtons from "./UserFriendshipButtons";

const UserContent = ({ userID }: { userID: string }) => {
  return (
    <div className="grid gap-3">
      <UserDetails userID={userID} />
      <UserFriends userID={userID} />

      <UserFriendshipButtons userID={userID} />
    </div>
  );
};

export default UserContent;
