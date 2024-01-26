"use client"
import React, { MouseEvent } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/hooks/reduxHooks';
import { AiFillHome, AiFillInfoCircle, AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import Link from 'next/link';
import { toggleShowSidebar } from '@/lib/slices/statesSlice';

const buttons = [
  { label: "Home", path: "/", Icon: AiFillHome, id: 1 },
  { label: "About", path: "/about", Icon: AiFillInfoCircle, id: 2 },
  { label: "Login", path: "/login", Icon: AiOutlineLogin, id: 3 },
  { label: "Signup", path: "/signup", Icon: AiOutlineUserAdd, id: 4 },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const showSidebar = useAppSelector(state => state.statesSlice.showSidebar);

  const closeSidebar = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    if (showSidebar) {
      dispatch(toggleShowSidebar(false));
    }
  }

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
