import React from 'react'
import { IPost, IUser } from '..'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const PostComponent = async (props: { post: IPost }) => {
  const { post } = props;
  console.log(post.userID);
  const req = await fetch(`http://localhost:3000/api/user?userID=${post.userID}`);
  const postOwner: IUser = await req.json();

  if (!postOwner) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cannot find post owner.</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  console.log(postOwner.username);

  return (
    <Card>
      <CardHeader>
        <Link href={`/user/${postOwner._id}`}>
          <CardTitle>{postOwner.username}</CardTitle>
        </Link>
      </CardHeader>

      <CardContent>
        {post.postContent}
      </CardContent>
    </Card>
  )
}

export default PostComponent
