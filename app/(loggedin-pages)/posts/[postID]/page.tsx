"use client";
import { IPost } from '@/app'
import PostComponent from '@/app/components/posts/PostComponent';
import { getPost } from '@/lib/api_calls/getPosts'
import React, { useEffect, useState } from 'react'

const Page = ({ params }: { params: { postID: string } }) => {
  const [postRes, setPostRes] = useState<IPost | undefined>(undefined);

  useEffect(() => {
    async function setFetchedPost() {
      const postRes: Awaited<Promise<IPost>> = await getPost(params.postID);
      setPostRes(postRes);
    }

    setFetchedPost();
  }, [params.postID]);

  if (postRes === undefined) {
    return <div>Post cannot find.</div>
  }
  return (
    <main className='container'>
      <PostComponent post={postRes} showComments />
    </main>
  )
}

export default Page
