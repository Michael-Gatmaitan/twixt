import React from 'react'

const page = async () => {
  const frRequestReq = await fetch("http://localhost:3000/api/fr-requests");
  const frReqsResult = await frRequestReq.json();
  console.log(frReqsResult);

  return (
    <div>
      Friend requests

      {frReqsResult[0]._id}
    </div>
  )
}

export default page
