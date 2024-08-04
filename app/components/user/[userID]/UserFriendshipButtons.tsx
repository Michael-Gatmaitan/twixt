import { IFriendship } from '@/app';
import { apiUrl } from '@/lib/apiUrl'
import React from 'react'
import RequestSentButton from '../../../user/[userID]/(relationship-buttons)/RequestSentButton';
import RespondRequestButton from '../../../user/[userID]/(relationship-buttons)/RespondRequestButton';
import AlreadyFriendButton from '../../../user/[userID]/(relationship-buttons)/AlreadyFriendButton';
import AddFriendButton from '../../../user/[userID]/(relationship-buttons)/AddFriendButton';
import { Button } from '@/components/ui/button';
import { cookies } from 'next/headers';

const UserFriendshipButtons = async ({ userID }: { userID: string }) => {
  // Get the friendship ID to determine friendship status
  const friendshipReq = await fetch(`${apiUrl}/friendship?userID=${userID}`, {
    headers: {
      Cookie: cookies().toString()
    }
  });
  const [youAreTheReqSender, friendshipFetchResult]: [boolean, IFriendship] = await friendshipReq.json();
  const { _id, status } = friendshipFetchResult;

  if (!_id) {
    return <div>Cannot defined friendship</div>
  }

  return (
    <div>
      {status === "pending" ?
        youAreTheReqSender ? <RequestSentButton friendshipID={_id} userID={userID} />
          : <RespondRequestButton friendshipID={_id} />
        : status === "accepted" ? <AlreadyFriendButton friendshipID={_id} userID={userID} /> :
          status === "no connection" || status === "rejected" ? <AddFriendButton friendshipID={_id} userID={userID} /> :
            <Button disabled>Loading</Button>}
    </div>
  )
}

export default UserFriendshipButtons
