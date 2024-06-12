import { IFriendship } from '@/app';
import { apiUrl } from '@/lib/apiUrl'
import React from 'react'

const page = async ({ params }: { params: { userID: string } }) => {

  const req = await fetch(`${apiUrl}/friends?userID=${params.userID}`);
  const res: IFriendship[] = await req.json();

  if (!req.ok) {
    return <div>There is an error fetching friends.</div>
  }

  if (!res.length) {
    return <div className='container'>{params.userID} has no friends.</div>
  }

  return (
    <div className="container">
      {params.userID}

      {res.map(friendship => (
        <div key={friendship._id}>{friendship.user2ID}</div>
      ))}
    </div>
  )
}

export default page
