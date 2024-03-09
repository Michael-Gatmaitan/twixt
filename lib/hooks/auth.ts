"use client";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { IUser } from "@/app";
import {
  setUsername,
  setPassword,
  setMongodbID,
  setLoggedin,
} from "../slices/userSlice";
import { useAppDispatch } from "./reduxHooks";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useSetAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userCookie = getCookie("authorize");
    console.log(apiUrl);

    console.log(userCookie);
    async function getUser() {
      const req = await fetch(`${apiUrl}/user?userID=${userCookie}`);
      const reqRes = await req.json();
      return reqRes;
    }

    if (!userCookie) return;

    getUser().then((data) => {
      console.log(data);

      if (data.message) {
        console.log(data.message);
        return;
      }

      if (data === "No user") {
        console.log(data);
        return;
      }

      if (data === undefined) {
        console.log(`Data has value of ${data}`);
      }

      const user: IUser = data;
      dispatch(setUsername(user.username));
      dispatch(setPassword(user.password));
      dispatch(setMongodbID(user._id));
      dispatch(setLoggedin(true));

      // router.replace("/posts");
    });

    // console.log(user);

    // const fetchedUser = getUser().then((data) => data);
    // console.log(fetchedUser);

    // if auth not exists, go to login, else, setLoggedIn to true
  }, [dispatch]);
};
