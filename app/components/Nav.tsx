"use client";
import Link from "next/link";
import React from "react";
import Button from "../(ui-components)/Button";

const Nav = () => (
  <nav className="sticky top-0 w-full bg-gray-900 p-4 flex justify-between items-center">
    <h1 className="text-2xl font-sans text-white font-bold">Twixt</h1>

    <div className="nav-buttons flex gap-2">
      <Link href="/login">
        <button className="primary-button">Login</button>

      </Link>

      <Link href="/signin">
        <button className="secondary-button">Signin</button>
      </Link>
    </div>
  </nav>
);

export default Nav;
