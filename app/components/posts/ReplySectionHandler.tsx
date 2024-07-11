"use client";
import { Button } from '@/components/ui/button';
import React, { Suspense, useState } from 'react'
// import PostForm from '@/app/(loggedin-pages)/posts/create/PostForm';

interface IReplySectionHandler { commentID: string, replyCount: number, children: React.ReactNode };

const ReplySectionHandler = ({ replyCount, children }: IReplySectionHandler) => {
  const [showReplies, setShowReplies] = useState(false);
  console.log(children)
  return (
    <>

      {/* {props.replyCount !== 0 ? <Button variant="ghost" onClick={() => setShowReplies(prev => !prev)}>
        {showReplies ? "Hide" : `Show ${props.replyCount}`} reply
      </Button> :
        null
      } */}
      <Button variant="ghost" onClick={() => setShowReplies(prev => !prev)}>
        {showReplies ? "Hide" : `Show ${replyCount}`} reply
      </Button>

      {/* // <Suspense fallback={<p>Reply loading</p>}> */}

      {/* </Suspense> */}
      {/* {showReplies ?
        // <ReplySection commentID={props.commentID} />
        :
        null
      } */}
      {showReplies ?
        <Suspense fallback={<div>Loading</div>}>
          {children}
        </Suspense>
        :
        null
      }
      {/* {children} */}
    </>
  )
}

export default ReplySectionHandler
