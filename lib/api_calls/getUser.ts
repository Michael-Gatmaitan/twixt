import { IUser } from "@/app";
import { apiUrl } from "../apiUrl";
import { cookies } from "next/headers";

type GetUserReturnType = IUser | { errorMessage: string };
export async function getUser(userID?: string): Promise<GetUserReturnType> {
  let fetchUrl = `${apiUrl}/user`;
  if (userID) {
    fetchUrl = `${apiUrl}/user?userID=${userID}`;
  }

  const req = await fetch(fetchUrl, {
    // This will add a Cookie header on the server-side fetch request
    headers: { Cookie: cookies().toString() },
  });

  if (!req.ok) {
    console.log("Request have an error");
    return {
      errorMessage: `an error has occured or user id of ${userID} not exists`,
    };
  }
  const res = await req.json();

  return res;
}
