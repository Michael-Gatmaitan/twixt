import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { IPost, IUser } from '../..'
import Link from 'next/link'
import PostButtons from './PostButtons'
import { Maximize } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PostForm from '@/app/(loggedin-pages)/posts/PostForm'
import CommentSection from './CommentSection'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface IPostComponent {
  post: IPost,
  showComments: boolean
}

const PostComponent = async ({ post, showComments }: IPostComponent) => {

  console.log(post.userID)

  const req = await fetch(`${apiUrl}/user?userID=${post.userID}`);
  const postOwner: IUser = await req.json();

  console.log(post);

  return (
    <main>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <Link href={`/user/${postOwner._id}`}>
                <CardTitle>{postOwner.username}</CardTitle>
              </Link>

              <CardDescription>{postOwner.status} </CardDescription>
            </div>
            <Button variant="ghost">
              <Link href={`/posts/${post._id}`}>
                <Maximize />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>{post.postContent}</CardContent>
        <CardFooter className={`${showComments ? "grid" : null}`}>
          <PostButtons likeCount={post.likeCount} postID={post._id} />
          {showComments ? <hr className="my-4" /> : null}

          {/* Show comments here */}
          <PostForm suppID={post._id} type='comments' />

          <CommentSection postID={post._id} />
          {/* {showComments ? <CommentSection postID={post._id} /> : null} */}
        </CardFooter>
      </Card>
    </main>
  )
}

export default PostComponent
