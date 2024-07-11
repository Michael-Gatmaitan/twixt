import { IFriendship } from '@/app';
import { apiUrl } from '@/lib/apiUrl'
import React from 'react'

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

const DisplayFriends = ({ friends }: { friends: IFriendship[] }) => {
  return (
    <div>
      {friends.map(friend => (
        <div key={friend._id}>{friend._id}</div>
      ))}
    </div>
  )
}

export default UserFriends