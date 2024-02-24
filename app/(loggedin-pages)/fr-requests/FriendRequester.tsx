import React from 'react'

interface IFriendRequester {
  requesterID: string
};

const FriendRequester = async ({ requesterID }: IFriendRequester) => {

  const requesterReq = await fetch(`http://localhost:3000/api/user?userID=${requesterID}`);
  const requesterRes = await requesterReq.json();

  console.log(requesterRes);

  if (!requesterRes._id) {
    return <div>Requester not found</div>
  }

  return (
    <div>
      {requesterRes.username}
    </div>
  )
}

export default FriendRequester
