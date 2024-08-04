import { IUser, IReply } from '@/app'
import { getUser } from '@/lib/api_calls/getUser'
import { timeDistance } from '@/lib/time_formatters/timeDistance'
import Link from 'next/link'
import React from 'react'

const ReplyComponent = async (props: { reply: IReply }) => {
  const { reply } = props;
  const replier: IUser = await getUser(reply.userID);

  return (
    <div className="p-4 border rounded-lg grid gap-1">
      <div>
        <Link href={`/user/${replier._id}`}>
          <div className="font-medium">{replier.username}</div>
        </Link>

        <div className="text-[10px] font-light">{timeDistance(reply.createdAt)}</div>
      </div>

      <div className='text-sm'>{reply.replyContent}</div>
    </div>
  )
}

export default ReplyComponent
