"use client"
import React, { useMemo } from 'react'
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
import { toggleShowLogoutModal, toggleShowSidebar } from '@/lib/slices/statesSlice';
import { selectLoggedIn, selectMongodbID } from '@/lib/slices/userSlice';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector(selectLoggedIn);
  const showSidebar = useAppSelector(state => state.statesSlice.showSidebar);


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

  const buttons = useMemo(() => loggedIn ? [
    { label: "Profile", path: "/me", Icon: HomeIcon, id: 1 },
    { label: "Search User", path: "/search-user", Icon: SearchIcon, id: 2 },
    { label: "Feed", path: "/", Icon: HomeIcon, id: 3 },
    { label: "About", path: "/about", Icon: AboutIcon, id: 4 },
    { label: "Friend requests", path: "/fr-requests", Icon: FriendRequestsIcon, id: 5 },
    { label: "Requests sent", path: "/fr-reqs-sent", Icon: RequestsSentIcon, id: 6 },
    // { label: "Logout", path: "/logout", Icon: LogoutIcon, id: 5 },
  ] : [
    { label: "Feed", path: "/", Icon: HomeIcon, id: 1 },
    { label: "About", path: "/about", Icon: AboutIcon, id: 2 },
    { label: "Login", path: "/login", Icon: LoginIcon, id: 3 },
    { label: "Signup", path: "/signup", Icon: SignupIcon, id: 4 },
  ], [loggedIn]);

  return (
    <main className={`
      container
      w-5/6 h-full fixed top-0 left-0 flex flex-col
      transition mt-[56px] pt-8 border-r
      bg-background
      lg:hidden
      ${showSidebar ? "-translate-x-0" : "-translate-x-full"}`}>
      {/* border-r-[3px] border-neutral-900 lg:hidden */}
      {buttons.map(button => (
        <SidebarButton key={button.id} path={button.path} closeSidebar={closeSidebar}>
          <button.Icon className="w-[24px] h-[24px]" /> {button.label}
        </SidebarButton>
      ))}

      {loggedIn ? <Button variant="ghost" onClick={handleShowLogoutModal} className='h-[68px] flex justify-start gap-[18px] text-2xl ssp-font'>
        <LogoutIcon />
        Logout
      </Button> : null}
    </main>
  )
}

interface ISidebarButton { children: React.ReactNode, path: string, closeSidebar: (path?: string) => void };

const SidebarButton = ({ children, path, closeSidebar }: ISidebarButton) => {

  return (
    <Button asChild variant="ghost" onClick={() => closeSidebar(path)} className='h-[68px] flex justify-start gap-[18px] text-2xl ssp-font'>
      <Link href={path}>
        {/* <button onClick={closeSidebar} className="rounded-md ssp-font w-full text-white flex gap-[18px] text-[24px] p-4 font-medium items-center hover:bg-neutral-900 transition">{children}</button> */}
        {children}
      </Link>
    </Button>
  );
}

export default Sidebar
