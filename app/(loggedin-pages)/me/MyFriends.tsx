import { IFriendship } from "@/app";
import UserFriendshipButtons from "@/app/components/user/[userID]/UserFriendshipButtons";
import { getUserFriends } from "@/lib/api_calls/getUserFriends";
import { verifySession } from "@/lib/dal";
import React from "react";

const MyFriends = async (props: { userID: string }) => {
  const friendsResult = await getUserFriends(props.userID);

  console.log("Friend result: ", friendsResult);

  if (friendsResult === null)
    return <div>There was an error while fetching your friends</div>;
  const myID = (await verifySession()).userID;
  const defineFriendID = (friendship: IFriendship) => {
    console.log(myID);

    return friendship.user1ID === myID
      ? friendship.user2ID
      : friendship.user1ID;
  };

  return (
    <div>
      {friendsResult.map((friend) => (
        <React.Fragment key={friend._id}>
          <code>{friend._id}</code>
          <h4>{friend.status}</h4>

          <UserFriendshipButtons userID={defineFriendID(friend)} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default MyFriends;

