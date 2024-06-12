import { verifySession } from '@/lib/dal'
import PostForm from './PostForm'

const page = async () => {
  return (
    <div className='container'>
      <PostForm type="posts" />
    </div>
  )
}

export default page
