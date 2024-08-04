"use client"

import React from 'react'
// import MenuIcon from '@/public/icons/menu.svg';
// import CloseIcon from '@/public/icons/close.svg';
// import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHooks';
import { toggleShowSidebar } from '@/lib/slices/statesSlice';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Button } from '@/components/ui/button';

const NavMenu = () => {
  const dispatch = useAppDispatch();
  const showSidebar = useAppSelector(state => state.statesSlice.showSidebar)
  // const [showSidebar, setShowSidebar] = useState(false);
  const handleMenuClick = () => {
    dispatch(toggleShowSidebar(!showSidebar));
  }

  return (
    <div className="nav-menu lg:hidden">
      {/* <Image src={showSidebar ? CloseIcon : MenuIcon} alt="menu_icon" />
       */}
      <Button className="px-2" variant="ghost" onClick={handleMenuClick}>
        {showSidebar ? <AiOutlineClose className='text-2xl' /> : <AiOutlineMenu className='text-2xl' />}
      </Button>
    </div>
  )
}

export default NavMenu
