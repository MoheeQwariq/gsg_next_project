import { getAllPosts } from "@/services/stories.service";
import Image from "next/image";
import PostContent from "@/components/PostContent";

const StoriesPage = () => {
  const posts = getAllPosts();

  return (
    <div>
      <h1>All Posts</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <Image
              src={post.image}
              alt={post.title}
              width={500}
              height={300}
            />
            <h2>{post.title}</h2>
            <PostContent content={post.content} postId={post.id} />
            <p>{post.author}</p>
            <p>Type: {post.type}</p>
            <p>Created At: {post.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;
