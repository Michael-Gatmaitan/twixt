import React from 'react'

const SpecificPost = ({ params }: { params: { userid: string, postid: string } }) => {
  return (
    <div>
      Specific post
      <h1>{params.userid}</h1>
      <h1>{params.postid}</h1>
    </div>
  )
}

export default SpecificPost
