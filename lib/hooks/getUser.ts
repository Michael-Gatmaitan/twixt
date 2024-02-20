"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useGetUser = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query.userID);
  }, [router]);
};
