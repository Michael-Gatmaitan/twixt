"use client"
import React, { useEffect, useMemo } from 'react'
import { useCheckUserCookies } from './hooks/checkUserAlreadyLoggedIn'
import { useSetAuth } from './hooks/auth'
import { useRouter, usePathname } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { useCloseSidebarOnPathnameChange } from './hooks/closeSidebarOnPathnameChange'
// import useCheckUserLoggin from './hooks/checkUserAlreadyLoggedIn'

const HooksComponent = ({ children }: { children: React.ReactNode }) => {
  // useCheckUserLoggin();
  // useCheckUserCookies();
  useCloseSidebarOnPathnameChange();

  const router = useRouter();
  const pathname = usePathname();
  const auth = getCookie("authorize");

  useEffect(() => {
    if (pathname.includes("user") || pathname.includes("posts")) {
      if (auth === undefined) {
        // create acc page
        router.replace("/join-us");
      }
    }
  }, [auth, router, pathname]);
  useSetAuth();

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default HooksComponent
