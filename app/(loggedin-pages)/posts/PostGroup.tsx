import { IPost } from "@/app"
// import PostComponent from "@/app/(ui-components)/PostComponent";
import PostComponent from "@/app/components/PostComponent";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const PostGroup = async () => {
  const req = await fetch(`${apiUrl}/posts`);
  const posts: IPost[] = await req.json();

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
