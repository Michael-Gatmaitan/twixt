import { verifySession } from '@/lib/dal'
import PostForm from './PostForm'

const page = async () => {

  const mongodbID = (await verifySession()).userID as string;

  return (
    <div className='container'>
      <PostForm type="posts" />
    </div>
  )
}

export default page
