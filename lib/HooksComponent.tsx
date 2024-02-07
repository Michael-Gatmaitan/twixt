"use client"
import React from 'react'
// import useCheckUserLoggin from './hooks/checkUserAlreadyLoggedIn'

const HooksComponent = ({ children }: { children: React.ReactNode }) => {
  // useCheckUserLoggin();

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default HooksComponent
