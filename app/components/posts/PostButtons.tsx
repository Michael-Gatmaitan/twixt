"use client"
import { Button } from '@/components/ui/button'
import { getCheckIfLiked } from '@/lib/api_calls/getCheckIfLiked';
import { deleteLike, postLike } from '@/lib/api_calls/likes';
import { getCookie } from 'cookies-next';
import { Heart, MessageCircleMore } from 'lucide-react';
import React, { MouseEvent, useEffect, useState } from 'react'

interface IPostButtons {
  likeCount: number;
  commentCount: number;
  postID: string;
  userID: string;
}

const PostButtons = (props: IPostButtons) => {
  const { likeCount, postID, userID } = props;

  const [postAlreadyLiked, setPostAlreadyLiked] = useState(false);
  const [likeCountState, setLikeCountState] = useState(likeCount);

  useEffect(() => {
    // Check if user already liked the post
    async function checkIfPostAlreadyLiked() {

      const checkReq = await getCheckIfLiked({
        type: "posts",
        compID: postID,
        userID
      });

      console.log(checkReq);

      if (checkReq?._id) setPostAlreadyLiked(true);
    }

    checkIfPostAlreadyLiked();
  }, [userID, postID]);

  const handleLikePost = async (e: MouseEvent) => {
    // console.log(e);
    if (userID === undefined) return;
    setPostAlreadyLiked(prev => !prev);

    if (!postAlreadyLiked) {
      await postLike({ type: "post", compID: postID, userID: userID })
      setLikeCountState(prev => prev + 1);
      // setPostAlreadyLiked(true);
    } else {
      await deleteLike({ type: "post", compID: postID, userID: userID }).then(data => console.log("Like .then", data));
      setLikeCountState(prev => prev - 1);
    }
  }

  return (
    <div className="flex justify-around w-full flex-grow">
      <Button variant="ghost" className="flex gap-2" onClick={handleLikePost}>
        {/* {postAlreadyLiked ? "Liked" : "Not liked"} {likeCount} */}
        {postAlreadyLiked ? <Heart fill='#fff' /> : <Heart fill='#000' />} <p>{likeCountState}</p>
      </Button>
      <Button variant="ghost" className="flex gap-2" >
        <MessageCircleMore />
        <p>{props.commentCount}</p>
      </Button>
      <Button variant="ghost">Share</Button>
    </div>
  )
}

export default PostButtons
