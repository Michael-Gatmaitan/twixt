
import { IFriendship } from '@/app';
import { getUserFriends } from '@/lib/api_calls/getUserFriends';
import { apiUrl } from '@/lib/apiUrl';

const MyFriends = async (props: { userID: string }) => {

  const friendsResult = await getUserFriends(props.userID);

  if (friendsResult === null)
    return <div>There was an error while fetching your friends</div>

  return (
    <div>
      {friendsResult.map(friend => (
        <>
          <code>{friend._id}</code>
          <h4>{friend.status}</h4>
        </>
      ))}
    </div>
  )
}

export default MyFriends;
