import { apiUrl } from '@/lib/apiUrl';
import GetFrRequests from './GetFrRequests';
import { Suspense } from 'react';
import { IFriendRequests, IFriendship } from '@/app';

// we need to fetch in client side

const page = () => {

  return (
    <main className='container'>
      <div className="page-header">
        <div className="text-4xl">Friend requests</div>
      </div>

      {/* {frReqs.map(frReq => <div key={frReq._id}>{frReq.createdAt.toISOString()}</div>)} */}

      <Suspense fallback={<div>Fetching friend requests.</div>}>
        <GetFrRequests />
      </Suspense>

      {/* {frReqsResult.map((frReq) => (
        <FriendRequester requesterID={frReq.user2ID} key={frReq._id} />
      ))} */}

    </main>
  )

}

export default page
