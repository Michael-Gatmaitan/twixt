"use client";
import { IUser } from '@/app';
import { getUser } from '@/lib/api_calls/getUser';
import React, { useEffect, useState } from 'react'
import FriendshipButtons from './FriendshipButtons';
import UserBio from './UserBio';
import UserStatus from './UserStatus';


const PageContent = ({ params }: { params: { userID: string } }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [fetchingUser, setFetchingUser] = useState<boolean>(true);
  // const [userSentRequest, setUserSentRequest] = useState<boolean>(false);
  // const [youSentRequest, setYouSentRequest] = useState<boolean>(false);

  useEffect(() => {
    const userResult = getUser(params.userID);

    // we need to have a fallback when user is not found.
    userResult.then((data) => {
      setFetchingUser(false);
      if (data.message) {
        console.log("error");
        // user not found
      } else {
        setUser(data);
      }
    });

  }, [params.userID]);

  if (fetchingUser) {
    return <div>Fetching user</div>
  }

  if (user === undefined) {
    return <div>User not found</div>
  }

  return (
    <>
      <div className='text-4xl'>{user.username}</div>

      {/* User status */}
      <UserStatus status={user.status} />

      {/* Bio */}
      <UserBio bio={user.bio} />

      {/* Friendships */}
      <FriendshipButtons userID={user._id} />

      <div className="text-4xl">
        {user?.username}
      </div>
    </>
  )
}

export default PageContent
