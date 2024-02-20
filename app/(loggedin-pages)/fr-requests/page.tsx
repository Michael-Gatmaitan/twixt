import { IFriendship, IUser } from '@/app';
import connectDB from '@/lib/mongodb';
import Friendship from '@/models/Friendship';
import User from '@/models/User';
import React from 'react'
import FriendRequester from './FriendRequester';

const page = async () => {
  // await connectDB();

  // const frRequestReq = await fetch("http://localhost:3000/api/fr-requests");
  // const frReqsResult: IFriendship[] = await frRequestReq.json();
  // console.log(frReqsResult);

  return (
    <div>
      Friend requests

      {/* {frReqsResult.map((frReq) => (
        <FriendRequester requesterID={frReq.user2ID} key={frReq._id} />
      ))} */}
    </div>
  )
}

export default page
