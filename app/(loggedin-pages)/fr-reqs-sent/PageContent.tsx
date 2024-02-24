import { IFriendship } from '@/app'
import React from 'react'

const PageContent = ({ requestSents }: { requestSents: IFriendship[] }) => {
  return (
    <React.Fragment>
      <h1 className='text-2xl'>Friend requests sent</h1>

      <div>
        {requestSents.map(req => (
          <div key={req._id}>{req.user2ID}</div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default PageContent
