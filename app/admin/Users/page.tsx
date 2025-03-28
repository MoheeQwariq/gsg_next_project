"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function UsersPage() {
  const [users, setUsers] = useState<Stories.User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users")
        const data = await res.json()
        setUsers(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mr-4">
          👥
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
          Users
        </h1>
        <span className="ml-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-sm font-medium">
          {loading ? "..." : users.length} users
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-cyan-50">
          <h2 className="font-semibold text-lg text-blue-800">Users List</h2>
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
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100 transform hover:scale-[1.01]"
                >
                  <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center text-white text-lg font-medium overflow-hidden shadow-md">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={56} 
                        height={56} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">{user.name}</p>
                    <p className="text-sm text-blue-600">{user.email}</p>
                  </div>

                  <span className="ml-auto px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-xs font-medium shadow-sm">
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
