import React from 'react';
import User from '@/models/User';
import MeContent from '@/app/(loggedin-pages)/me/MeContent';

const page = async () => {

  return (
    <main className='container'>
      <MeContent />
    </main>
  )
}

export default page
