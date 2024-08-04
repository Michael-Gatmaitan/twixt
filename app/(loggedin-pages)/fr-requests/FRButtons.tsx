"use client"
import { Button } from '@/components/ui/button'
import { updateFriendship } from '@/lib/api_calls/updateFriendship';
import React, { useState } from 'react'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface IFRButtons {
  friendshipID: string
}

interface IRequestBody {
  friendshipID: string,
  response: "accepted" | "rejected" | "pending"
}

const FRButtons = ({ friendshipID }: IFRButtons) => {
  const [statusResponse, setStatusResponse] = useState<"accepted" | "rejected" | "pending">("pending");

  const handleFriendRequestResponse = async (status: "accepted" | "rejected" | "pending") => {

    setStatusResponse(status);

    const reqBody: IRequestBody = {
      friendshipID: friendshipID,
      response: status
    };

    const res = await updateFriendship(reqBody);

    // const req = await fetch(`${apiUrl}/fr-requests?friendshipID=${friendshipID}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }w,
    //   body: JSON.stringify(reqBody)
    // });

    // const res = await req.json();

    console.log(res);
  }

  return (
    <React.Fragment>
      {
        statusResponse !== 'pending' ? (
          <>
            <Button disabled>{statusResponse}</Button>
            <Button onClick={() => handleFriendRequestResponse("pending")}>Cancel</Button>
          </>
        ) :
          (
            <>
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
            </>
          )
      }
    </React.Fragment>
  )
}

export default FRButtons
