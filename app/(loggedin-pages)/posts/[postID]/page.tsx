import { IPost } from '@/app'
import PostComponent from '@/app/components/posts/PostComponent';
import { getPost } from '@/lib/api_calls/getPosts'
import React from 'react'

const page = async ({ params }: { params: { postID: string } }) => {
  const postRes: Awaited<Promise<IPost>> = await getPost(params.postID);
  // console.log("Page post/[postID]: ", postRes);
  return (
    <main className='container'>
      <PostComponent post={postRes} showComments />
    </main>
  )
}

export default page
