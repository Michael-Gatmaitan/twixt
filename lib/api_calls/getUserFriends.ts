import { IFriendship } from "@/app";
import { apiUrl } from "../apiUrl";

export async function getUserFriends(
  userID: string
): Promise<IFriendship[] | null> {
  const fetchFriends = await fetch(`${apiUrl}/friends?userID=${userID}`);
  const res = await fetchFriends.json();

  if (!res[0]?._id) {
    const friends: IFriendship[] = res;
    return friends;
  }

  return null;
}
