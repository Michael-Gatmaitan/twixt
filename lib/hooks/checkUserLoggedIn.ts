"use client";

import { useEffect } from "react";
import { useAppDispatch } from "./reduxHooks";
import { setUsername, setPassword, setLoggedin } from "../slices/userSlice";
import { useRouter } from "next/navigation";

const useCheckUserLoggin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const storageUsername: string | null = localStorage.getItem("username");
    const storagePassword: string | null = localStorage.getItem("password");
    if (
      storageUsername !== null &&
      storagePassword !== null &&
      storageUsername !== "" &&
      storagePassword !== ""
    ) {
      console.log("Account in local storage detected.");

      dispatch(setUsername(storageUsername));
      dispatch(setPassword(storagePassword));
      dispatch(setLoggedin(true));
      router.push("/posts");
    } else {
      console.log("No account in local storage.");
    }
  }, [router, dispatch]);
};

export default useCheckUserLoggin;
