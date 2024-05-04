import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { redirect } from "next/navigation";
import { cache } from "react";
import connectDB from "./mongodb";
import User from "@/models/User";
import { IUser } from "@/app";

export const verifySession = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  // if (!session?.userID) redirect("/login");
  if (!session?.userID) return { isAuth: false, userID: null };

  const userID = session.userID as string;

  return { isAuth: true, userID };
};

export const getMyUserData: () => Promise<string> = cache(async () => {
  const session = await verifySession();
  if (!session) return "";

  try {
    await connectDB();

    // We dont need to fetch our password here.
    const user = await User.findOne(
      {
        _id: session.userID,
      },
      { password: 0 }
    );

    if (user?._id) return JSON.stringify(user);
  } catch (error) {
    console.log("Failed to fetch user.");
    return "";
  }

  return "";
});
