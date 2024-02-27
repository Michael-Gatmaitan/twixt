import FriendRequester from './FriendRequester';
import GetFrRequests from './GetFrRequests';

// we need to fetch in client side

const page = () => {

  return (
    <main className='container'>
      Friend requests

      <GetFrRequests />

      {/* {frReqsResult.map((frReq) => (
        <FriendRequester requesterID={frReq.user2ID} key={frReq._id} />
      ))} */}
    </main>
  )
}

export default page
