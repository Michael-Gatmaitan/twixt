"use client";

import { IReply } from '@/app';
import React, { useEffect, useState } from 'react'
import ReplyComponent from './ReplyComponent';
import PostForm from '@/app/(loggedin-pages)/posts/create/PostForm';
import { getReplies } from '@/lib/api_calls/replies';

interface IReplySection { mongodbID: string, commentID: string }

const ReplySection = (props: IReplySection) => {
  const [replies, setReplies] = useState<IReply[]>([]);

  const appendNewReply = (newReply: IReply) => {
    setReplies([...replies, newReply]);
  }

  useEffect(() => {
    async function getRepliesFunc() {
      const replies = await getReplies(props.commentID);
      setReplies(replies);
    }

    getRepliesFunc();
  }, [props.commentID]);

  return (
    <>
      <PostForm suppID={props.commentID} mongodbID={props.mongodbID} type='replies' appendNewReply={appendNewReply} />
      <div className="grid gap-2">
        {replies.map(reply => (
          <ReplyComponent key={reply._id} reply={reply} />
        ))}
      </div>
    </>
  )
}

export default ReplySection
