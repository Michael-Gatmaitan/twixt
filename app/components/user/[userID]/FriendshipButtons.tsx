"use client";
import React from 'react'
import { Button } from '@/components/ui/button';
import AddFriendButton from '../../../user/[userID]/(relationship-buttons)/AddFriendButton';
import RespondRequestButton from '../../../user/[userID]/(relationship-buttons)/RespondRequestButton';
import RequestSentButton from '../../../user/[userID]/(relationship-buttons)/RequestSentButton';
import AlreadyFriendButton from '../../../user/[userID]/(relationship-buttons)/AlreadyFriendButton';

interface IFriendshipButtons {
  friendshipID: string;
  friendshipStatus: "pending" | "accepted" | "rejected" | "no connection" | "";
  userID: string;
  areYouTheRequestSender: boolean;
};

// todo: Add loading state
const FriendshipButtons = ({ friendshipID, friendshipStatus, userID, areYouTheRequestSender }: IFriendshipButtons) => {
  console.log(friendshipStatus);
  return (
    <div className="mt-6 gap-2 flex">
      <p>{areYouTheRequestSender ? "Yes, im the sender" : "No, im not the sender"}</p>
      {/* {userCookieID === userID ?
        <div>Your profile</div> :
        <> */}
      {friendshipStatus === "pending" ? (
        areYouTheRequestSender ? <RequestSentButton friendshipID={friendshipID} userID={userID} /> : <RespondRequestButton friendshipID={friendshipID} />
      ) :
        friendshipStatus === "accepted" ? <AlreadyFriendButton friendshipID={friendshipID} userID={userID} /> :
          friendshipStatus === "no connection" || friendshipStatus === "rejected" ? <AddFriendButton friendshipID={friendshipID} userID={userID} /> :
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

export default FriendshipButtons
