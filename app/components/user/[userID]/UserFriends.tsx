import { IFriendship } from '@/app';
import { apiUrl } from '@/lib/apiUrl'
import React from 'react'
import UserFriendshipButtons from './UserFriendshipButtons';
import { defineFriendID } from '@/actions/functions';

const UserFriends = async ({ userID }: { userID: string }) => {
  const userFriendsReq = await fetch(`${apiUrl}/friends?userID=${userID}`)

  if (!userFriendsReq.ok) return <div>Failed to fetch friends.</div>

  const userFriendsRes: IFriendship[] = await userFriendsReq.json();

  if (!userFriendsRes) {
    console.log(userFriendsRes);
    return <div>Fetching friends has resulted to error</div>
  }
  return (
    <div>
      {userFriendsRes.length === 0 ? <div>This user as no friends yet.</div> : <DisplayFriends friends={userFriendsRes} />}
    </div>
  )
}

const DisplayFriends = async ({ friends }: { friends: IFriendship[] }) => {
  return (
    <div>
      {friends.map(async (friend) => {
        return (
          <React.Fragment key={friend._id}>
            <div key={friend._id}>{friend._id}</div>

            <UserFriendshipButtons userID={defineFriendID(friend)} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default UserFriends