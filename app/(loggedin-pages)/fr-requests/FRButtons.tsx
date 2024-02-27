"use client"
import { Button } from '@/components/ui/button'
import React from 'react'

interface IFRButtons {
  friendshipID: string
}

interface IRequestBody {
  friendshipID: string,
  response: "accepted" | "rejected"
}

const FRButtons = ({ friendshipID }: IFRButtons) => {

  const handleFriendRequestResponse = async (status: "accepted" | "rejected") => {
    const reqBody: IRequestBody = {
      friendshipID: friendshipID,
      response: status
    };

    const req = await fetch(`http://localhost:3000/api/fr-requests?friendshipID=${friendshipID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqBody)
    });

    const res = await req.json();

    console.log(res);
  }

  return (
    <React.Fragment>
      <Button
        onClick={() => handleFriendRequestResponse("accepted")}
      >
        Accept
      </Button>

      <Button
        variant="secondary"
        onClick={() => handleFriendRequestResponse("rejected")}
      >
        Reject
      </Button>
    </React.Fragment>
  )
}

export default FRButtons
