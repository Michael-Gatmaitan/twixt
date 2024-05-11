import MeContent from '@/app/(loggedin-pages)/me/MeContent';
import MyFriends from './MyFriends';
import { getMyUserData } from '@/lib/dal';

const page = async () => {

  const me = await getMyUserData();

  if (!me) return <div>Log in againnnn</div>

  return (
    <main className='container'>
      <MeContent me={me} />

      <MyFriends userID={me._id} />
    </main>
  )
}

export default page
