import { getUser } from '@/lib/api_calls/getUser'
import { timeDistance } from '@/lib/time_formatters/timeDistance';
import { Calendar } from 'lucide-react';
import React from 'react'

const UserDetails = async ({ userID }: { userID: string }) => {
  const userDetails = await getUser(userID);

  if (!userDetails?._id) return <div>User not found</div>

  // Profile picture
  // Username
  // Bio
  // Status (?)
  const dateJoined: Date | string = timeDistance(userDetails.createdAt);

  return (
    <div className='grid gap-2 text-white'>
      <div className='text-sm font-medium text-white text-opacity-80'># {userDetails.username}</div>
      <div className='flex gap-4 items-center'>
        {/* Profile and username */}
        <div className="w-20 h-20 bg-slate-500 rounded-full" />
        <div className='text-4xl font-bold'>{userDetails.username}</div>

      </div>
      <div className='text-base font-medium'>{userDetails.bio}</div>

      <div className='flex gap-2 items-center'>
        <Calendar />
        <div className='text-base opacity-80'>
          Joined {dateJoined}
        </div>
      </div>
    </div>
  )
}

export default UserDetails
