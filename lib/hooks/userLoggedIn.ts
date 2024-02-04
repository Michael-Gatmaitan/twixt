import { useAppSelector } from "./reduxHooks";
import { selectLoggedIn } from "../slices/userSlice";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const useUserLoggedIn = () => {
  const loggedIn = useAppSelector(selectLoggedIn);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      if (path.includes("login")) {
        router.push("/");
      }
    }
  }, [loggedIn, router, path]);
};
