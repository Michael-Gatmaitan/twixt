"use client";
import { IPost } from "@/app"
// import PostComponent from "@/app/(ui-components)/PostComponent";
import PostComponent from "@/app/components/PostComponent";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const PostGroup = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    async function getPosts() {
      const req = await fetch(`${apiUrl}/posts`);
      const posts = await req.json();

      if (posts.message || req.status === 500) {
        console.log("Error occured in fetching posts");
        console.log(posts);
        return;
      }
      setPosts(posts);
    }

    getPosts();
  }, []);

  try {
    posts.map(post => console.log(post));
  } catch (err) {
    console.log(posts);
    return (
      <div>Post invalid</div>
    )
  }

  return (
    <div>
      {posts.map((post: IPost) => (
        // <div key={post._id}>{post.postContent}</div>
        <PostComponent post={post} key={post._id} />
      ))}
    </div>
  )
}

export default PostGroup
