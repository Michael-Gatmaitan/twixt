import { IPost } from '@/app'
import PostComponent from '@/app/components/posts/PostComponent';
import { getPost } from '@/lib/api_calls/getPosts'
import { apiUrl } from '@/lib/apiUrl';
import React from 'react'

const page = async ({ params }: { params: { postID: string } }) => {

  console.log(params.postID, typeof params.postID);
  const postRes: Awaited<Promise<IPost>> = await getPost(params.postID);
  console.log("Page post/[postID]: ", postRes);
  return (
    <main className='container'>
      <PostComponent post={postRes} showComments />
    </main>
  )
}

export default page
