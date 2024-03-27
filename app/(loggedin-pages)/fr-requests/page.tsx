import FriendRequester from './FriendRequester';
import GetFrRequests from './GetFrRequests';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// we need to fetch in client side

const page = () => {

  return (
    <main className='container'>
      <div className="page-header">
        <div className="text-4xl">Friend requests</div>
      </div>

      <GetFrRequests />

      {/* {frReqsResult.map((frReq) => (
        <FriendRequester requesterID={frReq.user2ID} key={frReq._id} />
      ))} */}
    </main>
  )

}

export default page
