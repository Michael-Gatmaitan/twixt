// "use client";
import { IComment } from '@/app';
import { apiUrl } from '@/lib/apiUrl';
import React from 'react'
import CommentComponent from './CommentComponent';

const CommentSection = async (props: { postID: string }) => {

  console.log("Post id in comment section: ", props.postID)
  const req = await fetch(`${apiUrl}/comments?postID=${props.postID}`, { cache: "no-store" });
  const comments: IComment[] = await req.json();

  console.log("Comments: ", comments);
  return (
    <div className="grid gap-2 py-2">
      {comments.map(comment => (
        <CommentComponent comment={comment} key={comment._id} />
      ))}
    </div>
  )
}

export default CommentSection
