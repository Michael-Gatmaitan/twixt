"use client";
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';

interface IFriendshipButtons {
  userID: string;
};

const FriendshipButtons = ({ userID }: IFriendshipButtons) => {
  const [friendshipStatus, setFriendship] = useState("");
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFriendStatus() {
      const friendshipReq = await fetch(`http://localhost:3000/api/friendship?userID=${userID}`);
      const friendshipResult = await friendshipReq.json();
      const friendshipStatus: "pending" | "accepted" | "no connection"
        = friendshipResult.status;

      setFriendship(friendshipStatus);
    }

    getFriendStatus();
    // setLoading(false);
  }, [userID]);

  const updateFriendship = async () => {

    // create a friendship if it doens't exist.
    if (friendshipStatus === "no connection") {
      const frReq = await fetch(`http://localhost:3000/api/friendship?userID=${userID}`, {
        method: "POST"
      });

      const frReqRes = await frReq.json();

      console.log(frReqRes)
    }
  };


  console.log(friendshipStatus);

  return (
    <div className="mt-6 gap-2 flex">
      <Button onClick={updateFriendship}>
        {
          friendshipStatus === "pending" ? "Request sent"
            : friendshipStatus === "accepted" ? "Friends"
              : friendshipStatus === "no connection" ? "Add friend"
                : "Loading"
        }
      </Button>

      <Button variant="secondary">Message</Button>
    </div>
  )
}

export default FriendshipButtons
