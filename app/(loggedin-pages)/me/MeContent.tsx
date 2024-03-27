"use client"
import { IFriendship, IUser } from '@/app';
import { getUser } from '@/lib/api_calls/getUser';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'

const MeContent = () => {
  const [me, setMe] = useState<IUser | undefined>(undefined);
  const [fetchingData, setFetchingData] = useState(true);
  const [myFriends, setMyFriends] = useState<IUser[]>([]);
  const myID: string | undefined = getCookie("authorize")?.toString();

  useEffect(() => {
    if (myID !== undefined) {
      getUser(myID).then((data: IUser) => {
        if (data._id !== undefined) {
          setFetchingData(false);
          setMe(data);
        }
      });
    }
  }, [myID]);

  if (fetchingData) {

    return (
      <div className='container'>
        <div className="text-4xl">Fetching your data...</div>
      </div>
    )
  }

  if (me === undefined) {
    return (
      <div className='container'>
        <div className="text-4xl">User undefined</div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-4xl">
        <p>{me.username}</p>
        <p>{me._id}</p>
      </div>
    </div>
  )
}

export default MeContent
