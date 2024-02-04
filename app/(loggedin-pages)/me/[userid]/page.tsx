import React from 'react';
import User from '@/models/User';

const page = async ({ params }: { params: { userid: string } }) => {

  // const userData = await fetch(`https://localhost:3000/api/me`);
  // const thisUser: UserType | null = await User.findOne({
  //   _id: params.userid
  // });

  return (
    <div>
      Hello user
    </div>
  )
}

export default page
