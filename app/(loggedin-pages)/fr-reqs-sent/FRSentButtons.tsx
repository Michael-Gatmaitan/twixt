"use client";
import { Button } from '@/components/ui/button'
import React from 'react'

const FRSentButtons = ({ friendshipID }: { friendshipID: string }) => {

  const handleCancelRequest = async () => {
    const req = await fetch("http://localhost:3000/api/fr-req-sent", {
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
