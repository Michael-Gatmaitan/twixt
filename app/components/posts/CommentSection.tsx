"use client";
import React, { useEffect, useState } from 'react'
import CommentComponent from './CommentComponent';
import { getComments } from '@/lib/api_calls/comments';
import { IComment } from '@/app';
import PostForm from '@/app/(loggedin-pages)/posts/create/PostForm';

interface ICommentSection {
  postID: string;
}

const CommentSection = (props: ICommentSection) => {
  const [comments, setComments] = useState<IComment[]>([]);

  const appendNewComment = (newComment: IComment) => {
    setComments([...comments, newComment]);
  }

  useEffect(() => {
    async function getCommentsFunc() {
      const comments = await getComments(props.postID);
      setComments(comments);
    }
    getCommentsFunc();
  }, [props.postID]);

  // console.log("Post id in comment section: ", props.postID)

  console.log("Comments: ", comments);
  return (
    <>
      {/* Show comments here */}
      <PostForm suppID={props.postID} type='comments' appendNewComment={appendNewComment} />

      <div className="grid gap-2 py-2">
        {comments.map(comment => (
          <CommentComponent comment={comment} key={comment._id} />
        ))}
      </div>
    </>
  )
}

export default CommentSection
