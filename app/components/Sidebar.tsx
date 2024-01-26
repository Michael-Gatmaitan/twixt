"use client"
import React, { MouseEvent, useEffect, useMemo, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks/reduxHooks';
import {
  AiFillHome as HomeIcon,
  AiFillInfoCircle as AboutIcon,
  AiOutlineLogin as LoginIcon,
  AiOutlineLogout as LogoutIcon,
  AiOutlineUserAdd as RequestsSentIcon,
  AiOutlineUserSwitch as FriendRequestsIcon,
  AiOutlineUsergroupAdd as SignupIcon
} from 'react-icons/ai';
import Link from 'next/link';
import { toggleShowLogoutModal, toggleShowSidebar } from '@/lib/slices/statesSlice';
import { selectLoggedIn } from '@/lib/slices/userSlice';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(selectLoggedIn);
  const showSidebar = useAppSelector(state => state.statesSlice.showSidebar);

  const closeSidebar = (e: MouseEvent<HTMLButtonElement>) => {
    if (showSidebar) dispatch(toggleShowSidebar(false));
  }

  const buttons = useMemo(() => loggedIn ? [
    { label: "Home", path: "/", Icon: HomeIcon, id: 1 },
    { label: "About", path: "/about", Icon: AboutIcon, id: 2 },
    { label: "Friend requests", path: "/fr-requests", Icon: FriendRequestsIcon, id: 3 },
    { label: "Requests sent", path: "/fr-reqs-sent", Icon: RequestsSentIcon, id: 4 },
    // { label: "Logout", path: "/logout", Icon: LogoutIcon, id: 5 },
  ] : [
    { label: "Home", path: "/", Icon: HomeIcon, id: 1 },
    { label: "About", path: "/about", Icon: AboutIcon, id: 2 },
    { label: "Login", path: "/login", Icon: LoginIcon, id: 3 },
    { label: "Signup", path: "/signup", Icon: SignupIcon, id: 4 },
  ], [loggedIn]);

  useEffect(() => {
    console.log(buttons);
  }, [buttons]);

  return (
    <main className={`
      w-5/6 h-full fixed top-[56px] left-0 flex flex-col
      bg-neutral-950 transition pt-[64px]
      container-shadow
      lg:hidden
      ${showSidebar ? "-translate-x-0" : "-translate-x-full"}`}>
      {/* border-r-[3px] border-neutral-900 lg:hidden */}
      {buttons.map(button => (
        <SidebarButton key={button.id} path={button.path} closeSidebar={closeSidebar}>
          <button.Icon className="w-[24px] h-[24px]" /> {button.label}
        </SidebarButton>
      ))}

      {loggedIn ? <button onClick={() => dispatch(toggleShowLogoutModal(true))} className="ssp-font w-full text-white flex gap-[18px] text-[24px] p-4 font-medium items-center hover:bg-neutral-900 transition">
        <LogoutIcon />
        Logout
      </button> : null}
    </main>
  )
}

interface ISidebarButton { children: React.ReactNode, path: string, closeSidebar: (e: MouseEvent<HTMLButtonElement>) => void };

const SidebarButton = ({ children, path, closeSidebar }: ISidebarButton) => {

  return (
    <Link href={path}>
      <button onClick={closeSidebar} className="ssp-font w-full text-white flex gap-[18px] text-[24px] p-4 font-medium items-center hover:bg-neutral-900 transition">{children}</button>
    </Link>
  );
}

export default Sidebar
