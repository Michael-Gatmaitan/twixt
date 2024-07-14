import { IPost } from "@/app";
import { apiUrl } from "../apiUrl";
import { revalidate } from "@/app/(loggedin-pages)/posts/page";

export async function getPosts(userID?: string): Promise<IPost[]> {
  const reqString = userID
    ? `${apiUrl}/posts?userID=${userID}`
    : `${apiUrl}/posts`;

  const reqPosts = await fetch(reqString);
  return await reqPosts.json();
}

export async function getPost(postID: string): Promise<IPost> {
  const reqPost = await fetch(`${apiUrl}/posts?postID=${postID}`);
  return await reqPost.json();
}
