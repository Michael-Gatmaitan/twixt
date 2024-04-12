import { apiUrl } from "../apiUrl";

export async function getUser(userID: string) {
  const req = await fetch(`${apiUrl}/user?userID=${userID}`);
  const res = await req.json();

  return res;
}
