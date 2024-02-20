"use client";
import React, { useEffect, useState } from 'react'
import { IUser } from '../..'
import FriendshipButtons from './FriendshipButtons';
import UserBio from './UserBio';
import UserStatus from './UserStatus';

const Page = ({ params }: { params: { userID: string } }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getUser() {
      const req = await fetch(`http://localhost:3000/api/user?userID=${params.userID}`);
      const res = await req.json();
      return res;
    }

    getUser().then((data: IUser) => {
      setLoading(false);

      if (!data._id) throw new Error("User not found");

      setUser(data);
    });
  }, [params]);

  // const req = await fetch(`http://localhost:3000/api/user?userID=${params.userID}`);
  // const user: IUser = await req.json();

  // if (!user) {
  //   return (
  //     <main className='container'>
  //       <div className="text-4xl">User not found.</div>
  //     </main>
  //   )
  // }

  if (loading) {
    return <main className='container'>Fetching user</main>
  }

  if (!user) {
    return <main className='container'>
      User not found.
    </main>
  }

  return (
    <main className="container">
      {params.userID}
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

export default Page
