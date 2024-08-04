"use client";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { apiUrl } from '@/lib/apiUrl'
import { updateFriendship } from '@/lib/api_calls/updateFriendship';
import AddFriendButton from './AddFriendButton';

type IAlreadyFriend = {
  friendshipID: string,
  userID: string
}

const AlreadyFriendButton = ({ friendshipID, userID }: IAlreadyFriend) => {
  const [unfriended, setUnfriended] = useState(false);
  const handleAlreadyFriend = () => {
    console.log("Already friends");
  }

  const handleUnfriend = () => {
    if (unfriended) return;
    console.log("Unfriend");

    updateFriendship({ friendshipID, response: 'rejected' });
    setUnfriended(true);
  }

  return (
    unfriended ?
      <AddFriendButton friendshipID={friendshipID} userID={userID} /> :
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Friends</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleUnfriend()}>Unfriend</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}

export default AlreadyFriendButton
