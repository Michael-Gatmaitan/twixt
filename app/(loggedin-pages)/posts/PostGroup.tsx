import { IPost } from '@/app';
import PostComponent from '@/app/components/posts/PostComponent';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getPosts } from '@/lib/api_calls/getPosts';
import { apiUrl } from '@/lib/apiUrl';
import Link from 'next/link';
import React, { Suspense } from 'react'

const PostGroup = async () => {
  const posts: Awaited<Promise<IPost[]>> = await getPosts();
  // if (posts.sta)
  console.log(posts);

  const postReq = await fetch(`${apiUrl}/posts?postID=${`65c3ad6c167b16865a54d598`}`)
  const postRes = await postReq.json();

  console.log(postRes);

  try {
    for (const post of posts)
      post._id;
  } catch (error) {
    return <main>
      <code>Error for loading posts.</code>
      <Button asChild>
        <Link href="/">Go home</Link>
      </Button>
    </main>
  }

  return (
    <main className='grid gap-2'>
      sss
      {posts.map(post => (
        <Suspense fallback={<PostSKeleton />} key={post._id}>
          <PostComponent post={post} showComments={false} />
        </Suspense>
      ))}
    </main>
  )
}

const PostSKeleton = () => {
  // const rand = Math.floor(Math.random() * 4);

  return (
    <div className='p-4'>
      <Skeleton className="h-8 w-2/6 rounded-lg" />
      <Skeleton className="h-16 mt-2 w-full rounded-lg" />
    </div>
  )
}

export default PostGroup
