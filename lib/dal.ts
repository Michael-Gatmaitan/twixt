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

  if (!session?.userID) {
    redirect("/login");
  }

  return { isAuth: true, userID: session.userID };
};

export const getUser: () => Promise<IUser | null> = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    await connectDB();

    const user = await User.findOne({
      _id: session.userID,
    });

    if (user?._id) return user;
  } catch (error) {
    console.log("Failed to fetch user.");
    return null;
  }

  return null;
});
