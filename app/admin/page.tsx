"use client"
import { useEffect, useState } from "react";
export default function AdminDashboard() {
  const [users, setUsers] = useState<Stories.User[]>([]);
  const [posts, setPosts] = useState<Stories.Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch("/api/users");
        const usersData = await usersResponse.json();
        setUsers(usersData);
        const postsResponse = await fetch("/api/posts");
        const postsData = await postsResponse.json();
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const totalUsers = users.length;
  const totalStories = posts.length;
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-r from-pink-500 to-orange-500 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl mr-4">
          🏠
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
          Admin Dashboard
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-xl border-2 border-blue-300 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between pb-3">
            <h2 className="text-lg font-medium text-blue-700">Total Users</h2>
            <div className="bg-blue-500 text-white p-3 rounded-full">
              👤
            </div>
          </div>
          <div className="text-4xl font-bold text-blue-800">
            {loading ? "..." : totalUsers}
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-xl border-2 border-purple-300 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between pb-3">
            <h2 className="text-lg font-medium text-purple-700">Total Stories</h2>
            <div className="bg-purple-500 text-white p-3 rounded-full">
              📚
            </div>
          </div>
          <div className="text-4xl font-bold text-purple-800">
            {loading ? "..." : totalStories}
          </div>
        </div>
      </div>
    </div>
  );
}
