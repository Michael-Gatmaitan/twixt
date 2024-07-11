"use client"
import React from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks/reduxHooks';
import {
  AiFillHome as HomeIcon,
  AiFillInfoCircle as AboutIcon,
  AiOutlineLogin as LoginIcon,
  AiOutlineLogout as LogoutIcon,
  AiOutlineUserAdd as RequestsSentIcon,
  AiOutlineUserSwitch as FriendRequestsIcon,
  AiOutlineUsergroupAdd as SignupIcon,
  AiOutlineSearch as SearchIcon
} from 'react-icons/ai';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { selectShowSidebar, toggleShowLogoutModal, toggleShowSidebar } from '@/lib/slices/statesSlice';

import { Button } from '@/components/ui/button';
// import { CgSpinner } from 'react-icons/cg';

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const showSidebar = useAppSelector(selectShowSidebar);

  const closeSidebar = (path?: string) => {
    console.log(path);
    if (path === "/me") {
      router.push("/me");
    }

    if (showSidebar) dispatch(toggleShowSidebar(false));
  }

  const handleShowLogoutModal = () => {
    closeSidebar();
    dispatch(toggleShowLogoutModal(true));
  }

  const buttons = [
    { label: "Profile", path: "/me", Icon: HomeIcon, id: 1 },
    { label: "Search User", path: "/search-user", Icon: SearchIcon, id: 2 },
    { label: "Feed", path: "/posts", Icon: HomeIcon, id: 3 },
    { label: "About", path: "/about", Icon: AboutIcon, id: 4 },
    { label: "Friend requests", path: "/fr-requests", Icon: FriendRequestsIcon, id: 5 },
    { label: "Requests sent", path: "/fr-reqs-sent", Icon: RequestsSentIcon, id: 6 },
  ];

  return (
    <main className={`
      container
      w-5/6 h-full fixed top-0 left-0 flex flex-col gap-2
      transition mt-14 pt-8 border-r
      bg-background
      lg:sticky lg:-translate-x-0 lg:opacity-100 lg:w-max lg:p-0 lg:pr-4 lg:border-none lg:top-0
      ${showSidebar ? "-translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>
      {/* border-r-[3px] border-neutral-900 lg:hidden */}
      {buttons.map(button => (
        <SidebarButton key={button.id} path={button.path} closeSidebar={closeSidebar}>
          <button.Icon className="w-[24px] h-[24px]" /> {button.label}
        </SidebarButton>
      ))}

      {/* {loggedIn ? <Button variant="ghost" onClick={handleShowLogoutModal} className='h-[68px] flex justify-start gap-[18px] text-2xl ssp-font'>
        <LogoutIcon />
        Logout
      </Button> : null} */}
      <Button variant="ghost" onClick={handleShowLogoutModal} className='h-[68px] flex justify-start gap-[18px] text-2xl ssp-font'>
        <LogoutIcon />
        Logout
      </Button>
    </main>
  )
}

interface ISidebarButton { children: React.ReactNode, path: string, closeSidebar: (path?: string) => void };

const SidebarButton = ({ children, path, closeSidebar }: ISidebarButton) => {

  return (
    <Button onClick={() => closeSidebar(path)} asChild variant="ghost" className='h-[68px] flex justify-start gap-[18px] text-2xl ssp-font px-4 py-2'>
      <Link href={path}>
        {/* <button onClick={closeSidebar} className="rounded-md ssp-font w-full text-white flex gap-[18px] text-[24px] p-4 font-medium items-center hover:bg-neutral-900 transition">{children}</button> */}
        {children}
      </Link>
    </Button>
  );
}

export default Sidebar
