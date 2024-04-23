"use client";
import { Button } from '@/components/ui/button';
import React, { Suspense, useState } from 'react'
import ReplySection from './ReplySection';
import PostForm from '@/app/(loggedin-pages)/posts/PostForm';

const ReplySectionHandler = (props: { commentID: string, replyCount: number }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <>

      {/* {props.replyCount !== 0 ? <Button variant="ghost" onClick={() => setShowReplies(prev => !prev)}>
        {showReplies ? "Hide" : `Show ${props.replyCount}`} reply
      </Button> :
        null
      } */}
      <Button variant="ghost" onClick={() => setShowReplies(prev => !prev)}>
        {showReplies ? "Hide" : `Show ${props.replyCount}`} reply
      </Button>

      {/* // <Suspense fallback={<p>Reply loading</p>}> */}

      {/* </Suspense> */}
      {showReplies ?
        <ReplySection commentID={props.commentID} />
        :
        null
      }
    </>
  )
}

export default ReplySectionHandler
