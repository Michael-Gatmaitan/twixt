import { IReply } from '@/app'
import React from 'react'

const ReplyComponent = (props: { reply: IReply }) => {
  return (
    <div>{props.reply.replyContent}</div>
  )
}

export default ReplyComponent
