"use client"
import { IUser } from '@/app';
import { getUser } from '@/lib/api_calls/getUser';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react'

const MeContent = () => {
  const [me, setMe] = useState<IUser | undefined>(undefined);
  const myID: string | undefined = getCookie("authorize")?.toString();

  useEffect(() => {
    if (myID !== undefined) {
      getUser(myID).then((data: IUser) => {
        if (data._id !== undefined) {
          setMe(data);
        }
      });
    }
  }, [myID]);

  if (me === undefined) {
    return <div className='container'>
      <div className="text-4xl">User undefined</div>
    </div>
  }

  return (
    <div>
      <div className="text-4xl">
        {me.username}
      </div>
    </div>
  )
}

export default MeContent
