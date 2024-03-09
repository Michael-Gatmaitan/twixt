"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "./reduxHooks";
import { toggleShowSidebar } from "../slices/statesSlice";

export const useCloseSidebarOnPathnameChange = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
    dispatch(toggleShowSidebar(false));
  }, [dispatch, pathname]);
};
