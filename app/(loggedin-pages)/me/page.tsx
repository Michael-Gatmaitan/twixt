import MyFriends from '../../components/me/MyFriends';
import { getUser } from '@/lib/api_calls/getUser';
import { IUser, IUserWOPassword } from '@/app';
import MyDetails from '../../components/me/MyDetails';

const page = async () => {

  const me: IUserWOPassword = await getUser();

  if (!me?._id) {
    return <main className='container'>
      No user found
    </main>
  }

  return (
    <main className='container'>
      <MyDetails me={me} />
      <MyFriends userID={me._id} />
    </main>
  )
}

export default page;
