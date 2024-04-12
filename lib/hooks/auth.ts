"use client";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { IUser } from "@/app";
import {
  setUsername,
  setPassword,
  setMongodbID,
  setLoggedin,
} from "../slices/userSlice";
import { toggleAuthProcessing } from "../slices/statesSlice";
import { useAppDispatch } from "./reduxHooks";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useSetAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userCookie = getCookie("authorize");
    toggleAuthProcessing(true);

    async function getUser(id: string) {
      const req = await fetch(`${apiUrl}/user?userID=${id}`);
      const reqRes = await req.json();
      return reqRes;
    }

    if (userCookie !== undefined) {
      getUser(userCookie).then((data) => {
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

        dispatch(toggleAuthProcessing(false));
      });

      // return;
    }

    console.log("Auth fauled");
    dispatch(toggleAuthProcessing(false));
  }, [dispatch]);
};
