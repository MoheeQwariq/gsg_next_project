"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import PostContent from "@/components/PostContent";

const StoriesPage = () => {
  const [posts, setPosts] = useState<Stories.Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

 
  const handleDelete = async (id: number) => {
    const res = await fetch("/api/posts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setPosts(posts.filter((post) => post.id !== id));   
    } else {
      alert("Failed to delete the post.");
    }
  };

  if (loading) return <p>Loading...</p>;
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
            <p>Created At: {post.createdAt}</p>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;
