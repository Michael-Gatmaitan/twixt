"use client";
import { IFriendship, IUser } from '@/app';
import { getUser } from '@/lib/api_calls/getUser';
import React, { useEffect, useState } from 'react'
import FriendshipButtons from './FriendshipButtons';
import UserBio from './UserBio';
import UserStatus from './UserStatus';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const PageContent = ({ params }: { params: { userID: string } }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [fetchingUser, setFetchingUser] = useState<boolean>(true);
  const [friendshipStatus, setFriendshipStatus] =
    useState<"pending" | "accepted" | "no connection" | "">("");
  const [areYouTheRequestSender, setAreYouTheRequestSender] = useState<boolean>(false);

  const [friendshipResult, setFriendshipResult] = useState<IFriendship | undefined>(undefined);

  const router = useRouter();

  // const [userSentRequest, setUserSentRequest] = useState<boolean>(false);
  // const [youSentRequest, setYouSentRequest] = useState<boolean>(false);

  useEffect(() => {
    if (params.userID === getCookie("authorize")) {
      router.replace("/me");
      return;
    }
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

    // Paste the code here about friendships
    // and pass it the result as a prop

    async function getFriendStatus() {
      const friendshipReq = await fetch(`${apiUrl}/friendship?userID=${params.userID}`);
      const [isReqSender, friendshipFetchResult] = await friendshipReq.json();

      if (isReqSender !== null) {
        setAreYouTheRequestSender(isReqSender);
      }

      setFriendshipResult(friendshipFetchResult);

      setFriendshipStatus(friendshipFetchResult.status);

      // const mongoid = getCookie("authorize");
      // if (friendshipStatus === "pending") {
      //   if (friendshipResult.user1ID === mongoid) {
      //     console.log("you are the req Sender");
      //   } else if (friendshipResult.user2ID === mongoid) {
      //     console.log("he/she is the req Sender");
      //   }
      // }
    }

    getFriendStatus();


  }, [params.userID, router]);

  if (fetchingUser) {
    return <div>Fetching user</div>
  }

  if (user === undefined) {
    return <div>User not found</div>
  }

  if (friendshipResult === undefined) {
    return <div>Friendship result is undefined</div>
  }

  return (
    <>
      <div className='text-4xl'>{user.username}</div>

      {/* User status */}
      <UserStatus status={user.status} />

      {/* Bio */}
      <UserBio bio={user.bio} />

      {/* Friendships */}
      <FriendshipButtons
        friendshipID={friendshipResult._id}
        friendshipStatus={friendshipResult.status}
        userID={params.userID}
        areYouTheRequestSender={areYouTheRequestSender}
      />

      <div className="text-4xl">
        {user.username}
      </div>
    </>
  )
}

export default PageContent;
