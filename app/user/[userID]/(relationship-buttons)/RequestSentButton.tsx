"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { apiUrl } from '@/lib/apiUrl';
import AddFriendButton from './AddFriendButton';

const RequestSentButton = ({ friendshipID, userID }: { friendshipID: string, userID: string }) => {
  const [requestCanceled, setRequestCanceled] = useState(false);

  const handleRequestSent = async () => {
    if (requestCanceled) return;
    setRequestCanceled(true);

    const updateRequest = await fetch(`${apiUrl}/fr-requests`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        friendshipID,
        response: "rejected"
      })
    })

    console.log(updateRequest);
  }

  return (
    requestCanceled ? <AddFriendButton friendshipID={friendshipID} userID={userID} /> :
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Request sent</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>    
          <DropdownMenuItem onClick={() => handleRequestSent()}>Cancel</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}

export default RequestSentButton