"use client";
import { Button } from '@/components/ui/button';
import { apiUrl } from '@/lib/apiUrl';
import { useState } from 'react';
import RequestSentButton from './RequestSentButton';

const AddFriendButton = ({ friendshipID, userID }: { friendshipID: string, userID: string }) => {
  const [addedAsFriend, setAddedAsFriend] = useState<boolean>(false);

  const handleAddFriend = async () => {
    if (addedAsFriend) return;

    const frReq = await fetch(`${apiUrl}/friendship?userID=${userID}`, {
      method: "POST"
    });

    const frReqRes = await frReq.json();
    console.log(frReqRes);

    setAddedAsFriend(true);
  }

  return (
    addedAsFriend ? <RequestSentButton friendshipID={friendshipID} userID={userID} />
      : <Button onClick={handleAddFriend}>Add friend</Button>
  )
}

export default AddFriendButton
