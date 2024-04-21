import { IComment, IUser } from '@/app'
import { getUser } from '@/lib/api_calls/getUser'
// import { apiUrl } from '@/lib/apiUrl';
import { timeDistance } from '@/lib/time_formatters/timeDistance';
import Link from 'next/link';
import React from 'react'
// import { formatDate } from 'date-fns'
// import PostForm from '@/app/(loggedin-pages)/posts/PostForm';
// import ReplySection from './ReplySection';
import ReplySectionHandler from './ReplySectionHandler';

const CommentComponent = async (props: { comment: IComment }) => {
  const { comment } = props;
  const commenter: IUser = await getUser(comment.userID);

  return (
    <div className="p-4 border rounded-lg grid gap-1">
      <div>
        <Link href={`/user/${commenter._id}`}>
          <div className="font-medium">{commenter.username}</div>
        </Link>

        <div className="text-[10px] font-light">{timeDistance(comment.createdAt)}</div>
      </div>

      <div className='text-sm'>{props.comment.commentContent}</div>
      {/* <ReplySection commentID={comment._id} /> */}

      <ReplySectionHandler commentID={comment._id} replyCount={comment.replyCount} />
    </div>
  )
}

export default CommentComponent
