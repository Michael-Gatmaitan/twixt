import Link from 'next/link'
import { Button } from '@/components/ui/button'
import PostGroup from './PostGroup';
import { getMyUserData } from '@/lib/dal';

const Page = async () => {

  // const loggedIn = useAppSelector(selectLoggedIn);

  // if (!loggedIn) {
  //   return <div className='container'>
  //     <h1 className="text-4xl">You must log in first.</h1>
  //   </div>
  // }

  const me = await getMyUserData();

  if (!me) return <div>Please login again.</div>

  return (
    <div className='container mt-4'>
      <h1>Posts from database</h1>

      <PostGroup userID={me._id} />

      <Button asChild>
        <Link href="/posts/create">Create post</Link>
      </Button>

    </div>
  )
}

export default Page
