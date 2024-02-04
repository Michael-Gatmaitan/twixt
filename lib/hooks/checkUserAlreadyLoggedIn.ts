"use client";

import { useEffect } from "react";
import { useAppDispatch } from "./reduxHooks";
import { setUsername, setPassword, setLoggedin } from "../slices/userSlice";
import { useRouter } from "next/navigation";
import { getDefaultAutoSelectFamilyAttemptTimeout } from "net";

const useCheckUserLoggin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function getUser(lsUsername: string, lsPassword: string) {
    const req = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: lsUsername,
        password: lsPassword,
      }),
    });

    return req;
  }

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

      getUser(storageUsername, storagePassword)
        .then((data) => {
          if (!data.ok) {
            console.log("Invalid localstorage values");
          } else {
            return data.json();
          }
        })
        .then((user) => {
          if (user !== undefined || user !== null) {
            console.log("Localstorage used for auth^^");
            dispatch(setUsername(storageUsername));
            dispatch(setPassword(storagePassword));
            dispatch(setLoggedin(true));
            router.push("/posts");
          } else {
            throw new Error("INVALID DATA FROM LOCALSTORAGE");
          }
        });
    } else {
      console.log("No account in local storage.");
    }
  }, [router, dispatch]);
};

export default useCheckUserLoggin;
