"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/reduxHooks";
import {
  selectShowLogoutModal,
  toggleShowLogoutModal,
} from "@/lib/slices/statesSlice";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth";

const LogoutModal = () => {
  const showLogoutModal = useAppSelector(selectShowLogoutModal);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const clearLoginData = () => {
    logout();
  };

  return showLogoutModal ? (
    <main className="w-screen h-screen absolute top-0 left-0 bg-opacity-50 bg-black grid place-items-center z-50">
      <div className="w-32 p-3 border border-neutral-700 bg-neutral-950 rounded-xl">
        <div className="text-2xl">Are you sure you want to logout?</div>

        <div className="flex gap-2">
          {/* <button className='primary-btn'>Yes</button> */}
          <Button onClick={clearLoginData}>Yes</Button>
          <button
            className="secondary-btn grow"
            onClick={() => dispatch(toggleShowLogoutModal(false))}
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  ) : null;
};
export default LogoutModal;
