import MeContent from '@/app/(loggedin-pages)/me/MeContent';
import MyFriends from './MyFriends';

const page = async () => {

  return (
    <main className='container'>
      <MeContent />

      <MyFriends />
    </main>
  )
}

export default page
