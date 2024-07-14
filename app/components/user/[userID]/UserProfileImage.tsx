"use client";
import Image from 'next/image';
import React from 'react'

const UserProfileImage = ({ src }: { src: string }) => {
  const x = "https://lastfm.freetls.fastly.net/i/u/770x0/043ab1adfe3f4881b8bdc12a9ababe60.jpg#043ab1adfe3f4881b8bdc12a9ababe60";
  console.log(src)
  return (
    <div className='w-full h-full flex place-items-center rounded-full overflow-hidden'>
      <Image loader={() => src} src={src} width={80} height={90} alt="profile" />
    </div>
  )
}

export default UserProfileImage
