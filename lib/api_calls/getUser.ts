import { IUser } from "@/app";
import { apiUrl } from "../apiUrl";
import { cookies } from "next/headers";

export async function getUser(userID?: string): Promise<IUser> {
  let fetchUrl = `${apiUrl}/user`;
  if (userID) {
    fetchUrl = `${apiUrl}/user?userID=${userID}`;
  }
  const req = await fetch(fetchUrl, {
    // This will add a Cookie header on the server-side fetch request
    headers: { Cookie: cookies().toString() },
  });
  const res = await req.json();

  return res;
}
