"use client";
import { Button } from '@/components/ui/button';
import React, { Suspense, useState } from 'react'
import ReplySection from './ReplySection';
import PostForm from '@/app/(loggedin-pages)/posts/PostForm';

const ReplySectionHandler = (props: { commentID: string }) => {
  const [showReplies, setShowReplies] = useState(false);
  return (
    <>

      <Button onClick={() => setShowReplies(prev => !prev)}>Show replies</Button>
      {showReplies ?
        <Suspense fallback={<p>Reply loading</p>}>
          <ReplySection commentID={props.commentID} />
        </Suspense>
        : null}
    </>
  )
}

export default ReplySectionHandler
