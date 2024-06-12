import GetFrRequests from './GetFrRequestsSent';
import PageContent from './PageContent';
const page = () => {

  // console.log("FR req sents: ", frReqSentRes);


  return (
    <main className='container'>
      <GetFrRequests />
      {/* <PageCont
      ent requestSents={frReqRes} /> */}
      {/* //   Friend requests sent

    //   {frReqSentRes.map(user => (
    //     <div key={user._id}>{user.username}</div>
    //   ))} */}
    </main>
  )
}

export default page
