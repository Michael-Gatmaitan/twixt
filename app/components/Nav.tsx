import Image from "next/image";
import Link from "next/link";
import React from "react";
import TWIXTLogo from '@/public/logo/twixt.svg';
import NavMenu from "./NavMenu";

const Nav = () => (
  <header className="sticky top-0 w-full z-50 bg-background/95 border-border/40 backdrop-blur border-b">
    <nav className="container flex justify-between items-center h-14">
      <NavMenu />

      <Link className="nav-logo" href="/">
        <Image src={TWIXTLogo} alt="twixt_logo" className="h-8" />
      </Link>

      <div className="nav-profile">
        <div className="w-6 h-6 bg-white rounded-full border-r-8 border-red-500" />
      </div>
    </nav>
  </header>
);

export default Nav;
