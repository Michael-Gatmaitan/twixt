import React from 'react'
import { CgSpinner } from "react-icons/cg";

const loading = () => {
  return (
    <div className='text-white text-4xl w-full h-screen grid justify-center items-center'>
      <CgSpinner className="w-8 h-8 animate-spin" />
    </div>
  )
}

export default loading
