import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { cache } from "react";
import connectDB from "./mongodb";
import User from "@/models/User";
import { IUser, IUserWOPassword } from "@/app";

export const verifySession = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  // if (!session?.userID) redirect("/login");
  if (!session?.userID) return { isAuth: false, userID: null };
  const userID = session.userID as string;
  return { isAuth: true, userID };
};

export const getMyUserData: () => Promise<IUserWOPassword | null> = cache(
  async () => {
    const session = await verifySession();
    if (!session?.isAuth) return null;

    try {
      await connectDB();

      const user = await User.findOne({ _id: session.userID }, { password: 0 });

      if (user?.id) {
        const parsedUser: IUserWOPassword = JSON.parse(JSON.stringify(user));
        return parsedUser;
      }
    } catch (err) {
      console.log("Error fetching user");
      return null;
    }

    return null;
  }
);
