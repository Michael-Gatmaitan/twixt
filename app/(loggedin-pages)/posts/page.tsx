import React from 'react'
import PostForm from './PostForm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Page = () => {


  return (
    <div className='container mt-4'>
      <Button asChild>
        <Link href="/posts/create">Create post</Link>
      </Button>

      <PostForm />
    </div>
  )
}

export default Page
