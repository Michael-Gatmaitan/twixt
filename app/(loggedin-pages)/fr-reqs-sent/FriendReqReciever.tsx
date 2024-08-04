import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import FRSentButtons from './FRSentButtons';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface IFriendReqReciever {
  friendshipID: string,
  requestReciever: string,
  createdAt: string
};

const FriendReqReciever = async ({ friendshipID, requestReciever, createdAt }: IFriendReqReciever) => {

  const reqRecieverReq = await fetch(`${apiUrl}/user?userID=${requestReciever}`);
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

export default FriendReqReciever;