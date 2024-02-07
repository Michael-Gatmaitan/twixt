import React, { useEffect } from 'react'
import { IPost, IUser } from '..'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import User from '@/models/User'
import connectDB from '@/lib/mongodb'

const PostComponent = async (props: { post: IPost }) => {
  const { post } = props;
  console.log(post.userID);
  const req = await fetch(`http://localhost:3000/api/user?userID=${post.userID}`);
  const user: IUser = await req.json();

  // if (!postOwner) {
  //   return (
  //     <Card>
  //       <CardHeader>
  //         <CardTitle>Cannot find post owner.</CardTitle>
  //       </CardHeader>
  //     </Card>
  //   );
  // }

  console.log(user.username);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.username}</CardTitle>
      </CardHeader>

      <CardContent>
        {post.postContent}
      </CardContent>
    </Card>
  )
}

export default PostComponent
