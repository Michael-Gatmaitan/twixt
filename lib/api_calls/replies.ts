import { IReply } from "@/app";
import { apiUrl } from "../apiUrl";

export async function getReplies(commentID: string): Promise<IReply[]> {
  const repliesReq = await fetch(`${apiUrl}/replies?commentID=${commentID}`);

  return await repliesReq.json();
}
