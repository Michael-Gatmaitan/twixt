"use client"
import React, { useEffect } from 'react'
import { useCheckUserCookies } from './hooks/checkUserAlreadyLoggedIn'
import { useSetAuth } from './hooks/auth'
// import useCheckUserLoggin from './hooks/checkUserAlreadyLoggedIn'

const HooksComponent = ({ children }: { children: React.ReactNode }) => {
  // useCheckUserLoggin();
  // useCheckUserCookies();
  useSetAuth();

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default HooksComponent
