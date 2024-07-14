"use client";
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

const ChangeProfileButton = () => {
  const route = useRouter();

  const handleChangeProfileOnClick = () => {
    route.replace('/upload-button');
  }

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className='right-0 bottom-0 px-1 py-1 h-min absolute bg-secondary rounded-full'>
          <PlusCircle />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleChangeProfileOnClick}>Change profile picture</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ChangeProfileButton
