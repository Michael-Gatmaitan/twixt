import { IComment } from "@/app";
import { apiUrl } from "../apiUrl";

export async function getComments(postID: string): Promise<IComment[]> {
  const reqComments = await fetch(`${apiUrl}/comments?postID=${postID}`);
  return await reqComments.json();
}
