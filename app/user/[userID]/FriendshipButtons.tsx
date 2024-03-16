"use client";
import React, { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button';
import { DropdownMenuItem, DropdownMenuTrigger, DropdownMenu, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { getCookie } from 'cookies-next';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface IFriendshipButtons { userID: string };

// todo: Add loading state
const FriendshipButtons = ({ userID }: IFriendshipButtons) => {
  const [friendshipStatus, setFriendship] = useState<"pending" | "accepted" | "no connection" | "">("");

  useEffect(() => {
    async function getFriendStatus() {
      const friendshipReq = await fetch(`${apiUrl}/friendship?userID=${userID}`);
      const friendshipResult = await friendshipReq.json();
      const friendshipStatus: "pending" | "accepted" | "no connection"
        = friendshipResult.status;

      setFriendship(friendshipStatus);

      const mongoid = getCookie("authorize");
      if (friendshipStatus === "pending") {
        if (friendshipResult.user1ID === mongoid) {
          console.log("you are the req Sender");
        } else if (friendshipResult.user2ID === mongoid) {
          console.log("he/she is the req Sender");
        }
      }
    }

    getFriendStatus();
  }, [userID]);


  console.log(friendshipStatus);

  return (
    <div className="mt-6 gap-2 flex">
      {/* {userCookieID === userID ?
        <div>Your profile</div> :
        <> */}
      {friendshipStatus === "pending" ? <RequestSentButton /> :
        friendshipStatus === "accepted" ? <AlreadyFriendButton /> :
          friendshipStatus === "no connection" ? <AddFriendButton userID={userID} /> :
            <Button disabled>Loading</Button>
      }

      {/* <Button onClick={updateFriendship}>
        {
          friendshipStatus === "pending" ? "Request sent"
            : friendshipStatus === "accepted" ? "Friends"
              : friendshipStatus === "no connection" ? "Add friend"
                : "Loading"
        }
      </Button> */}

      <Button variant="secondary">Message</Button>
    </div>
  )
}

const RequestSentButton = () => {
  const handleRequestSentButtonClick = () => {

  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Request sent</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleRequestSentButtonClick}>Cancel</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const AlreadyFriendButton = () => {
  const handleAlreadyFriendButtonClick = () => {
    console.log("Already friends");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Friends</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleAlreadyFriendButtonClick}>Unfriend</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const AddFriendButton = ({ userID }: { userID: string }) => {
  const handleAddFriendButtonClick = async () => {
    const frReq = await fetch(`${apiUrl}/friendship?userID=${userID}`, {
      method: "POST"
    });
    const frReqRes = await frReq.json();
    console.log(frReqRes);
  }
  return (
    <Button onClick={handleAddFriendButtonClick}>Add friend</Button>
  )
}

export default FriendshipButtons
