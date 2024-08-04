"use client";
import { Button } from '@/components/ui/button'
import React from 'react'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const FRSentButtons = ({ friendshipID }: { friendshipID: string }) => {

  const handleCancelRequest = async () => {
    const req = await fetch(`${apiUrl}/fr-req-sent`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ friendshipID })
    })
  }

  return (
    <React.Fragment>
      <Button onClick={handleCancelRequest}>Cancel request</Button>
    </React.Fragment>
  )
}

export default FRSentButtons
