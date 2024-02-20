import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { IPost, IUser } from '..'
import Link from 'next/link'

const PostComponent = async ({ post }: { post: IPost }) => {

  const req = await fetch(`http://localhost:3000/api/user?userID=${post.userID}`);
  const postOwner: IUser = await req.json();

  return (
    <Card>
      <CardHeader>
        <Link href={`/user/${postOwner._id}`}>
          <CardTitle>{postOwner.username}</CardTitle>
        </Link>
        <CardDescription>{postOwner.status}</CardDescription>
      </CardHeader>
      <CardContent>{post.postContent}</CardContent>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button>Like</Button>
          <Button variant="secondary">Commnet</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostComponent
