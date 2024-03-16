"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { useAppSelector } from '@/lib/hooks/reduxHooks';
import { selectLoggedIn } from '@/lib/slices/userSlice';
import PostGroup from './PostGroup';

const Page = () => {

  const loggedIn = useAppSelector(selectLoggedIn);

  if (!loggedIn) {
    return <div className='container'>
      <h1 className="text-4xl">You must log in first.</h1>
    </div>
  }

  return (
    <div className='container mt-4'>
      <h1>Posts from database</h1>

      <PostGroup />

      <Button asChild>
        <Link href="/posts/create">Create post</Link>
      </Button>

    </div>
  )
}

export default Page
