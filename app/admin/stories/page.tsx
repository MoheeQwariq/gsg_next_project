"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { FaBook, FaTrash, FaSearch, FaExclamationTriangle } from "react-icons/fa"
import PostContent from "@/components/admin/PostContent"
import Image from "next/image"

const StoriesPage: React.FC = () => {
  const [posts, setPosts] = useState<Stories.Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Stories.Post[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deletePostId, setDeletePostId] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts")
        const data = await response.json()
        setPosts(data)
        setFilteredPosts(data)
        setLoading(false)
      } catch (err) {
        setError("فشل في تحميل القصص")
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedType(value)
    filterPosts(searchQuery, value)
  }

  const filterPosts = (query: string, type: string) => {
    const filtered = posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
      const matchesType = type === "all" || post.category === type
      return matchesSearch && matchesType
    })
    setFilteredPosts(filtered)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    filterPosts(query, selectedType)
  }

  const confirmDelete = (postId: string) => {
    setDeletePostId(postId)
    setShowDeleteConfirm(true)
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setDeletePostId(null)
  }

  const handleDelete = async () => {
    if (!deletePostId) return
    setIsDeleting(true)
    try {
      await fetch(`/api/posts/${deletePostId}`, { method: "DELETE" })
      setPosts(posts.filter((post) => post.id !== deletePostId))
      setFilteredPosts(filteredPosts.filter((post) => post.id !== deletePostId))
      setShowDeleteConfirm(false)
      setDeletePostId(null)
      setIsDeleting(false)
    } catch (err) {
      setError("فشل في حذف القصة")
      setIsDeleting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-14 h-14 rounded-full flex items-center justify-center text-white text-xl ml-4 shadow-lg">
          <FaBook />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          القصص
        </h1>
        <span className="mr-4 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium shadow-md">
          {loading ? "..." : filteredPosts.length} قصة
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن القصص..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full sm:w-72 px-5 py-3.5 pr-12 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white shadow-sm"
              dir="rtl"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500">
              <FaSearch />
            </span>
          </div>
          <select
            value={selectedType}
            onChange={handleFilterChange}
            className="w-full sm:w-64 px-5 py-3.5 border-2 border-purple-200 rounded-full bg-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 shadow-sm appearance-none text-right pr-10"
            dir="rtl"
            style={{ backgroundPosition: "left 1rem center" }}
          >
            <option value="all">كل الأنواع</option>
            <option value="قصص شخصية">قصص شخصية</option>
            <option value="قصص شهداء ومفقودين">قصص شهداء ومفقودين</option>
            <option value="قصص النزوح واللجوء">قصص النزوح واللجوء</option>
            <option value="التعليم وسط الحرب">التعليم وسط الحرب</option>
            <option value="قصص الحياة اليومية الي تحت الحصار">قصص الحياة اليومية الي تحت الحصار</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 shadow-sm" dir="rtl">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p>{error}</p>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn backdrop-blur-sm"
          dir="rtl"
        >
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 animate-scaleIn">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white ml-4 shadow-md">
                <FaExclamationTriangle className="text-xl" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                تأكيد الحذف
              </h3>
            </div>
            <p className="mb-8 text-gray-600 text-lg leading-relaxed">
              هل أنت متأكد من رغبتك في حذف هذه القصة؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-gray-300"
                disabled={isDeleting}
              >
                إلغاء
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center min-w-[140px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <svg
                    className="animate-spin ml-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    <FaTrash className="ml-2" size={14} /> تأكيد الحذف
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-purple-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-56 bg-gradient-to-r from-purple-200 to-pink-200 animate-pulse"></div>
              <div className="p-6 space-y-4">
                <div className="h-7 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full animate-pulse w-3/4"></div>
                <div className="h-5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full animate-pulse w-full"></div>
                <div className="h-5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full animate-pulse w-full"></div>
                <div className="h-5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full animate-pulse w-2/3"></div>
                <div className="pt-4 flex justify-between">
                  <div className="h-5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full animate-pulse w-24"></div>
                  <div className="h-5 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full animate-pulse w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div
          className="text-center py-16 text-gray-500 bg-white rounded-2xl shadow-sm border border-purple-100"
          dir="rtl"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
            <FaBook className="text-purple-500 text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-purple-700 mb-2">
            {posts.length === 0 ? "لا توجد قصص في قاعدة البيانات" : "لا توجد قصص مطابقة لبحثك"}
          </h3>
          <p className="text-gray-500">
            {posts.length === 0 ? "يرجى إضافة قصص جديدة" : "يرجى تعديل معايير البحث للعثور على قصص"}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-purple-100 transition-all duration-300 hover:shadow-xl group"
              dir="rtl"
            >
              {post.image && (
                <div className="relative w-full h-56 overflow-hidden group-hover:opacity-95 transition-opacity">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium mb-3">
                  {post.category || "قصة"}
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors">
                  {post.title}
                </h2>
                <div className="text-gray-600 mb-4 line-clamp-3">
                  <PostContent content={post.content} postId={post.id} />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs ml-2">
                      {post.author?.charAt(0) || "؟"}
                    </div>
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>
                  <button
                    onClick={() => confirmDelete(post.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                    aria-label="حذف"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StoriesPage

