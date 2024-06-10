import { IPost } from '@/app';
import PostComponent from '@/app/components/posts/PostComponent';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getPosts } from '@/lib/api_calls/getPosts';
import Link from 'next/link';
import React, { Suspense } from 'react'

const PostGroup = async (props: { userID: string }) => {
  const posts: Awaited<Promise<IPost[]>> = await getPosts();

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
      {posts.map(post => (
        <Suspense fallback={<PostSkeleton />} key={post._id}>
          <PostComponent post={post} showComments={false} userID={props.userID} />
        </Suspense>
      ))}
    </main>
  )
}

const PostSkeleton = () => {
  // const rand = Math.floor(Math.random() * 4);

  return (
    <div className='p-4'>
      <Skeleton className="h-8 w-2/6 rounded-lg" />
      <Skeleton className="h-16 mt-2 w-full rounded-lg" />
    </div>
  )
}

export default PostGroup
