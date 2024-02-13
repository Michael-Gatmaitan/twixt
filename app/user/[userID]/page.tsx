import React from 'react'
import { IUser } from '../..'
import FriendshipButtons from './FriendshipButtons';
import UserBio from './UserBio';
import UserStatus from './UserStatus';

const page = async ({ params }: { params: { userID: string } }) => {
  const req = await fetch(`http://localhost:3000/api/user?userID=${params.userID}`);
  const user: IUser = await req.json();

  if (!user) {
    return (
      <main className='container'>
        <div className="text-4xl">User not found.</div>
      </main>
    )
  }

  return (
    <main className="container">
      <div className='text-4xl'>{user.username}</div>

      {/* User status */}
      <UserStatus status={user.status} />

      {/* Bio */}
      <UserBio bio={user.bio} />

      {/* Friendships */}
      <FriendshipButtons userID={user._id} />
    </main>
  )
}

export default page
