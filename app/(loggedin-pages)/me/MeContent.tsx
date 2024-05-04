import { IUser } from '@/app';
import { apiUrl } from '@/lib/apiUrl';
import { getMyUserData } from '@/lib/dal';

const MeContent = async () => {

  // We are now sure that user has session if they accessed this page.
  const fetchMyData = await getMyUserData();
  const me: IUser | undefined | null = JSON.parse(fetchMyData);

  if (!me?._id) {
    return <div>I have no data:&lt;</div>
  }

  return (
    <div>
      <div className="text-4xl">
        <p>{me.username}</p>
        <p>{me._id}</p>
      </div>
    </div>
  )
}

export default MeContent
