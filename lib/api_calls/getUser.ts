import { IUser } from "@/app";
import { apiUrl } from "../apiUrl";

export async function getUser(userID: string): Promise<IUser> {
  const req = await fetch(`${apiUrl}/user?userID=${userID}`);
  const res = await req.json();

  return res;
}
