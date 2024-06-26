import { IPost } from "@/app";
import { apiUrl } from "../apiUrl";

export async function getPosts(userID?: string): Promise<IPost[]> {
  const reqString = userID
    ? `${apiUrl}/posts?userID=${userID}`
    : `${apiUrl}/posts`;

  const reqPosts = await fetch(reqString, { cache: "no-cache" });
  return await reqPosts.json();
}

export async function getPost(postID: string): Promise<IPost> {
  const reqPost = await fetch(`${apiUrl}/posts?postID=${postID}`);
  // console.log(await reqPost.json());
  return await reqPost.json();
}
