"use client";
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button';
// import { getCookie } from 'cookies-next';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface IFriendshipButtons {
  userID: string;
};

const FriendshipButtons = ({ userID }: IFriendshipButtons) => {
  // const userCookieID = getCookie("authorize");
  const [friendshipStatus, setFriendship] = useState("");
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFriendStatus() {
      const friendshipReq = await fetch(`${apiUrl}/friendship?userID=${userID}`);
      const friendshipResult = await friendshipReq.json();
      const friendshipStatus: "pending" | "accepted" | "no connection"
        = friendshipResult.status;

      setFriendship(friendshipStatus);
    }

    getFriendStatus();
    // setLoading(false);
  }, [userID]);

  const updateFriendship = useMemo(() => {
    return async () => {

      // create a friendship if it doens't exist.
      if (friendshipStatus === "no connection") {
        const frReq = await fetch(`${apiUrl}/friendship?userID=${userID}`, {
          method: "POST"
        });

        const frReqRes = await frReq.json();

        console.log(frReqRes)
      }
    }
  }, [friendshipStatus, userID]);


  console.log(friendshipStatus);

  return (
    <div className="mt-6 gap-2 flex">
      {/* {userCookieID === userID ?
        <div>Your profile</div> :
        <> */}
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
