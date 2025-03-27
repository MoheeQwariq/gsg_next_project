"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import PostContent from "@/components/PostContent";

const StoriesPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedType = searchParams.get("type") || "";
  const [posts, setPosts] = useState<Stories.Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Stories.Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      let url = "/api/posts";
      if (selectedType && selectedType !== "all") {
        url += `?type=${selectedType}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, [selectedType]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) =>
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  }, [searchQuery, posts]);

  const handleDelete = async (id: number) => {
    const res = await fetch("/api/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setPosts(posts.filter((post) => post.id !== id));
    } else {
      alert("Failed to delete the post.");
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    router.push(newType === "all" ? "/admin/stories" : `?type=${newType}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>All Posts</h1>
      <input
        type="text"
        placeholder="Search by content..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <select onChange={handleFilterChange} value={selectedType}>
        <option value="all">All</option>
        <option value="success">Success</option>
        <option value="sad">Sad</option>
        <option value="inspirational">Inspirational</option>
      </select>

      <div>
        {filteredPosts.map((post) => (
          <div key={post.id}>
            <Image src={post.image} alt={post.title} width={500} height={300} />
            <h2>{post.title}</h2>
            <PostContent content={post.content} postId={post.id} />
            <p>{post.author} ({post.authorEmail})</p>
            <p>Type: {post.type}</p>
            <p>Created At: {post.createdAt}</p>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;
