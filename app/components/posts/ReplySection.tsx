import { IReply } from '@/app';
import { apiUrl } from '@/lib/apiUrl'
import React from 'react'
import ReplyComponent from './ReplyComponent';
import PostForm from '@/app/(loggedin-pages)/posts/PostForm';

const ReplySection = async (props: { commentID: string }) => {
  const repliesReq = await fetch(`${apiUrl}/replies?commentID=${props.commentID}`);
  const replies: IReply[] = await repliesReq.json();

  return (
    <>
      <PostForm suppID={props.commentID} type='replies' />
      <div className="bg-purple-700">
        {replies.map(reply => (
          <ReplyComponent key={reply._id} reply={reply} />
        ))}
      </div>
    </>
  )
}

export default ReplySection
