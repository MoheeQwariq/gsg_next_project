"use client"
import { useEffect, useState } from "react"
import { FaUsers, FaBook, FaHome, FaChartLine, FaCalendarAlt, FaArrowRight } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"

export default function AdminDashboard() {
  const [users, setUsers] = useState<Stories.User[]>([])
  const [posts, setPosts] = useState<Stories.Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch("/api/users")
        if (!usersResponse.ok) {
          throw new Error(`خطأ في جلب المستخدمين: ${usersResponse.status}`)
        }
        const usersData = await usersResponse.json()

        const postsResponse = await fetch("/api/posts")
        if (!postsResponse.ok) {
          throw new Error(`خطأ في جلب القصص: ${postsResponse.status}`)
        }
        const postsData = await postsResponse.json()
        setUsers(usersData)
        setPosts(postsData)
        setError(null)

      } catch (error) {
        setError("حدث خطأ أثناء جلب البيانات")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalUsers = users.length
  const totalStories = posts.length
  const currentDate = new Date().toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl ml-4">
            <FaHome />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
              لوحة التحكم
            </h1>
            <p className="text-gray-500 flex items-center mt-1">
              <FaCalendarAlt className="ml-1" /> {currentDate}
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 flex items-center">
            <FaChartLine className="text-indigo-500 ml-2" />
            <span className="text-gray-700">آخر تحديث: اليوم</span>
          </div>
        </div>
      </div>


      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-indigo-100 transform transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-indigo-700">إجمالي المستخدمين</h2>
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-3 rounded-full">
              <FaUsers />
            </div>
          </div>
          <div className="text-4xl font-bold text-indigo-800 mb-2">{loading ? "..." : totalUsers}</div>
          <Link href="/admin/Users" className="text-indigo-500 hover:text-indigo-700 text-sm flex items-center">
            عرض المستخدمين
            <FaArrowRight className="h-4 w-4 mr-1" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-purple-100 transform transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-purple-700">إجمالي القصص</h2>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full">
              <FaBook />
            </div>
          </div>
          <div className="text-4xl font-bold text-purple-800 mb-2">{loading ? "..." : totalStories}</div>
          <Link href="/admin/stories" className="text-purple-500 hover:text-purple-700 text-sm flex items-center">
            عرض القصص
            <FaArrowRight className="h-4 w-4 mr-1" />
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-lg font-medium text-gray-800 mb-4">آخر المستخدمين</h2>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {users.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 overflow-hidden">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-lg font-medium text-gray-800 mb-4">آخر القصص</h2>
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {posts.slice(0, 5).map((post) => (
                <div key={post.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 overflow-hidden">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaBook className="text-sm" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{post.title}</p>
                    <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString("ar-EG")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
