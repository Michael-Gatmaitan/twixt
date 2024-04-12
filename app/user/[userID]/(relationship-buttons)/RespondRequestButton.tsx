"use client";
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { apiUrl } from '@/lib/apiUrl'
import React, { useState } from 'react'

const RespondRequestButton = ({ friendshipID }: { friendshipID: string }) => {
  const [accepted, setAccepted] = useState<boolean>(false);

  const handleRespondRequest = async (responded: "accepted" | "rejected") => {

    if (responded === "accepted") {
      setAccepted(true);
    } else if (responded === "rejected") {
      await fetch(`${apiUrl}/fr-requests?friendshipID=${friendshipID}`, {
        method: "DELETE",

      });
      return;
    }

    const reqBody = {
      friendshipID,
      response: responded
    };

    console.log("Response sent.");
    await fetch(`${apiUrl}/fr-requests?friendshipID=${friendshipID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqBody)
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='flex gap-2'>Respond<ChevronDown /></Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleRespondRequest("accepted")}>Accept</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRespondRequest("rejected")}>Reject</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RespondRequestButton
