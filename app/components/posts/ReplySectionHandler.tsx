"use client";
import { Button } from '@/components/ui/button';
import React, { Suspense, useState } from 'react'
import ReplySection from './ReplySection';

const ReplySectionHandler = (props: { commentID: string, replyCount: number }) => {
  const [showReplies, setShowReplies] = useState(false);
  return (
    <>

      <Button onClick={() => setShowReplies(prev => !prev)}>Show {props.replyCount} reply</Button>
      {
        props.replyCount === 0 ? <ReplySection commentID={props.commentID} />
          : showReplies ?
            <Suspense fallback={<p>Reply loading</p>}>
              <ReplySection commentID={props.commentID} />
            </Suspense>
            :
            null
      }
    </>
  )
}

export default ReplySectionHandler
