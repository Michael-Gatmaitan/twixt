"use client"
import { IFriendship, IUser } from '@/app';
import { getCookie } from 'cookies-next'
import React, { useEffect, useState } from 'react'
import PageContent from './PageContent';

const FrReqsSent = () => {

  const userID = getCookie("authorize");
  const [frReqRes, setFrReqRes] = useState<IFriendship[]>([]);

  useEffect(() => {
    async function getFrReqSents() {
      if (userID === undefined) throw new Error("User id undefined");

      const frReqSentReq = await fetch(`http://localhost:3000/api/fr-req-sent?userID=${userID}`, {
        cache: 'no-cache'
      });

      return await frReqSentReq.json();
    }

    getFrReqSents().then((data: IFriendship[]) => {
      if (data) {
        setFrReqRes(data);
      }
    });

  }, [userID]);

  // console.log("FR req sents: ", frReqSentRes);


  return (
    <main className='container'>
      <PageContent requestSents={frReqRes} />
      {/* //   Friend requests sent

    //   {frReqSentRes.map(user => (
    //     <div key={user._id}>{user.username}</div>
    //   ))} */}
    </main>
  )
}

export default FrReqsSent
