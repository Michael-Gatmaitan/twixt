import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import FRSentButtons from './FRSentButtons';

interface IFriendReqReciever {
  friendshipID: string,
  requestReciever: string,
  createdAt: string
};

const FriendReqReciever = async ({ friendshipID, requestReciever, createdAt }: IFriendReqReciever) => {

  const reqRecieverReq = await fetch(`http://localhost:3000/api/user?userID=${requestReciever}`);
  const reqReciever = await reqRecieverReq.json();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {reqReciever.username}
        </CardTitle>

        <CardDescription>
          {createdAt}
        </CardDescription>
      </CardHeader>
      {/* {friendshipID} */}

      <CardFooter>
        <FRSentButtons friendshipID={friendshipID} />
      </CardFooter>
    </Card>
  )
}

export default FriendReqReciever
