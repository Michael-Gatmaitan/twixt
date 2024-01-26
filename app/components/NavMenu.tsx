"use client"

import React, { useState } from 'react'
// import MenuIcon from '@/public/icons/menu.svg';
// import CloseIcon from '@/public/icons/close.svg';
// import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks';
import { toggleShowSidebar } from '@/lib/slices/statesSlice';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const NavMenu = () => {
  const dispatch = useAppDispatch();
  const showSidebar = useAppSelector(state => state.statesSlice.showSidebar)
  // const [showSidebar, setShowSidebar] = useState(false);
  const handleMenuClick = () => {
    dispatch(toggleShowSidebar(!showSidebar));
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <onClick is safe here>
    <div className="nav-menu h-6 w-6 lg:hidden" onClick={handleMenuClick}>
      {/* <Image src={showSidebar ? CloseIcon : MenuIcon} alt="menu_icon" />
       */}
      {showSidebar ? <AiOutlineClose className='text-white text-2xl' /> : <AiOutlineMenu className='text-white text-2xl' />}
    </div>
  )
}

export default NavMenu
