"use client";
import { IFriendship } from '@/app';
import { apiUrl } from '@/lib/apiUrl';
import React, { useEffect, useState } from 'react';

const MyFriends = () => {
  const [friends, setFriends] = useState<IFriendship[]>();
  const [friendsIsReady, setFriendsIsReady] = useState(false);
  useEffect(() => {
    async function getFriends() {
      const fetchFriends = await fetch(`${apiUrl}/friends`);
      const friendsResult = await fetchFriends.json();

      console.log(friendsResult);
    }

    getFriends();
  }, []);

  return (
    <div>
      fr
    </div>
  )
}

export default MyFriends;
