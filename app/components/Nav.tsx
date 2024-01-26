import Image from "next/image";
import Link from "next/link";
import React from "react";
import TWIXTLogo from '@/public/logo/twixt.svg';
import NavMenu from "./NavMenu";
import Sidebar from "./Sidebar";

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 bg-neutral-950 flex justify-between items-center py-3 px-4 lg:py-3 lg:px-12 container-shadow">
    <NavMenu />

    <Link className="nav-logo" href="/">
      <Image src={TWIXTLogo} alt="twixt_logo" className="h-8" />
    </Link>

    <div className="nav-profile">
      <div className="w-6 h-6 bg-white rounded-full border-r-8 border-red-500" />
    </div>

    <Sidebar />

  </nav>
);

export default Nav;
