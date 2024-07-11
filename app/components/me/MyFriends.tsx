
import { IFriendship } from '@/app';
import { getUserFriends } from '@/lib/api_calls/getUserFriends';
import { apiUrl } from '@/lib/apiUrl';
import React from 'react';

const MyFriends = async (props: { userID: string }) => {

  const friendsResult = await getUserFriends(props.userID);

  console.log("Friend result: ", friendsResult);

  if (friendsResult === null)
    return <div>There was an error while fetching your friends</div>

  return (
    <div>
      {friendsResult.map(friend => (
        <React.Fragment key={friend._id}>
          <code>{friend._id}</code>
          <h4>{friend.status}</h4>
        </React.Fragment>
      ))}
    </div>
  )
}

export default MyFriends;