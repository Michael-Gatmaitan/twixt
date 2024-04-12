"use client"

import { IPost } from '@/app';
import { Button } from '@/components/ui/button'
import React, { MouseEvent, useEffect, useState } from 'react'

interface IPostButtons {
  likeCount: number;
  postID: string;
}

const PostButtons = (props: IPostButtons) => {

  const { likeCount, postID } = props;

  const [postAlreadyLiked, setPostAlreadyLiked] = useState(false);

  useEffect(() => {

  }, []);

  const handleLikePost = (e: MouseEvent) => {
    console.log(e);
  }

  return (
    <div>
      <div className="flex justify-between w-full">
        <Button onClick={handleLikePost}>Like {likeCount}</Button>
        <Button variant="secondary">Comment</Button>
      </div>
    </div>
  )
}

export default PostButtons
