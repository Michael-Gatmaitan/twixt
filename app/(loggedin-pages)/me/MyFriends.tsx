"use client";
import { IFriendship } from '@/app';
import { apiUrl } from '@/lib/apiUrl';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';

const MyFriends = () => {
  const [friends, setFriends] = useState<IFriendship[]>([]);
  const [friendsIsReady, setFriendsIsReady] = useState(false);
  useEffect(() => {

    const authID = getCookie("authorize");

    async function getFriends() {
      const fetchFriends = await fetch(`${apiUrl}/friends?userID=${authID}`);
      const friendsResult = await fetchFriends.json();

      console.log(friendsResult);
      setFriends(friendsResult);
    }

    getFriends();
  }, []);

  return (
    <div>
      {friends.map(friend => (
        <>
          <code>{friend._id}</code>
          <h4>{friend.status}</h4>
        </>
      ))}
    </div>
  )
}

export default MyFriends;
