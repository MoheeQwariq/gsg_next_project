"use client"
import { useEffect, useState } from "react"
import { FaUsers, FaUser, FaSearch } from "react-icons/fa"
import Image from "next/image";

export default function UsersPage() {
  const [users, setUsers] = useState<Stories.User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<Stories.User[]>([])
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/users")

        if (!res.ok) {
          throw new Error(`خطأ في الاستجابة: ${res.status}`)
        }

        const data = await res.json()
        setUsers(data)
        setFilteredUsers(data)
        setError(null)
      } catch (error) {
        console.error("Error fetching users:", error)
        setError("حدث خطأ أثناء جلب بيانات المستخدمين")
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users)
    } else {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
    }
  }, [searchQuery, users])

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl ml-4">
          <FaUsers />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">
          المستخدمون
        </h1>
        <span className="mr-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-medium">
          {loading ? "..." : users.length} مستخدم
        </span>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="ابحث عن مستخدم..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-10 border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-400 transition-all duration-200"
          />
          <span className="absolute left-3 top-3 text-blue-400">
            <FaSearch />
          </span>
        </div>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-cyan-50">
          <h2 className="font-semibold text-lg text-blue-800">قائمة المستخدمين</h2>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-200 to-cyan-200 animate-pulse"></div>
                  <div className="space-y-3 flex-1">
                    <div className="h-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">لا يوجد مستخدمين مطابقين لبحثك</div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100 transform hover:scale-[1.01]"
                >
                  <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center text-white text-lg font-medium overflow-hidden shadow-md">
                    {user.avatar ? (
                      <Image
                      src={user.avatar } 
                      alt={user.name}
                      width={56} 
                      height={56} 
                      className="rounded-full object-cover" 
                    />
                    ) : (
                      <FaUser className="text-white text-xl" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">{user.name}</p>
                    <p className="text-sm text-blue-600">{user.email}</p>
                  </div>

                  <span className="mr-auto px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-xs font-medium shadow-sm">
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

