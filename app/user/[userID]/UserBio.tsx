import React from 'react'

const UserBio = ({ bio }: { bio: string }) => {
  return (
    <div className="grid gap-2 mt-3">
      <div className='text-lg font-bold'>Bio</div>
      <div className="ssp-font">{bio}</div>
    </div>
  )
}

export default UserBio
