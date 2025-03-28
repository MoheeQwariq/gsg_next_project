"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"

const PostContent: React.FC<{ content: string; postId: number }> = ({ content, postId }) => {
  const [expandedPost, setExpandedPost] = useState<number | null>(null)

  const handleToggleContent = (postId: number) => {
    setExpandedPost(expandedPost === postId ? null : postId)
  }
  return (
    <div>
      <p className="text-gray-700 text-lg leading-relaxed">
        {expandedPost === postId ? content : `${content.slice(0, 100)}...`}
      </p>
      <button
        onClick={() => handleToggleContent(postId)}
        className="mt-2 text-sm text-blue-500 hover:underline"
      >
        {expandedPost === postId ? "Show Less" : "Read More"}
      </button>
    </div>
  )
}

export default function StoriesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedType = searchParams.get("type") || ""
  const [posts, setPosts] = useState<Stories.Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Stories.Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchPosts = async () => {
      let url = "/api/posts"
      if (selectedType && selectedType !== "all") {
        url += `?type=${selectedType}`
      }
      const res = await fetch(url)
      const data = await res.json()
      setPosts(data)
      setFilteredPosts(data)
      setLoading(false)
    }

    fetchPosts()
  }, [selectedType])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(
        posts.filter(
          (post) =>
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }
  }, [searchQuery, posts])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value
    router.push(newType === "all" ? "/admin/stories" : `/admin/stories?type=${newType}`)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "from-green-500 to-emerald-500 text-white"
      case "sad":
        return "from-blue-500 to-indigo-500 text-white"
      case "inspirational":
        return "from-purple-500 to-pink-500 text-white"
      default:
        return "from-gray-500 to-slate-500 text-white"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mr-4">
          📚
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Stories
        </h1>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-4 py-3 pl-10 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-400 transition-all duration-200 text-lg"
            />
            <span className="absolute left-3 top-3 text-purple-400">🔍</span>
          </div>
          <select
            value={selectedType}
            onChange={handleFilterChange}
            className="w-full sm:w-40 px-4 py-3 border-2 border-purple-200 rounded-full bg-white focus:outline-none focus:border-purple-400 transition-all duration-200 text-lg"
          >
            <option value="all">All Types</option>
            <option value="success">Success</option>
            <option value="sad">Sad</option>
            <option value="inspirational">Inspirational</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-purple-100">
              <div className="h-48 bg-gradient-to-r from-purple-200 to-pink-200 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full animate-pulse w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full animate-pulse w-full"></div>
                <div className="h-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full animate-pulse w-full"></div>
                <div className="h-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full animate-pulse w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-purple-100 transform transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
              {post.image && (
                <div className="relative h-48">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getTypeColor(post.type)} shadow-sm`}>
                    {post.type}
                  </span>
                </div>
                <h3 className="font-semibold text-2xl mb-2 text-purple-900">{post.title}</h3>
                <PostContent content={post.content} postId={post.id} />
                <div className="flex items-center text-lg text-purple-600 border-t border-purple-100 pt-3">
                  <div className="bg-gradient-to-r from-purple-200 to-pink-200 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                    {post.author.charAt(0)}
                  </div>
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
