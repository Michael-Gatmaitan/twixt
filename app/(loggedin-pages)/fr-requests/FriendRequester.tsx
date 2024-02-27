import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import FRButtons from './FRButtons';

interface IFriendRequester {
  friendshipID: string,
  requesterID: string,
  createdAt: string
};

const FriendRequester = async ({ friendshipID, requesterID, createdAt }: IFriendRequester) => {

  const requesterReq = await fetch(`http://localhost:3000/api/user?userID=${requesterID}`);
  const requester = await requesterReq.json();

  if (!requester._id) {
    return <div>Requester not found</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {requester.username}
        </CardTitle>

        <CardDescription>{createdAt}</CardDescription>
      </CardHeader>

      <CardFooter>
        <FRButtons friendshipID={friendshipID} />
      </CardFooter>
    </Card>
  )
}

export default FriendRequester
