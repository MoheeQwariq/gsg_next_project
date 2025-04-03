"use client"

import { useEffect, useState } from "react"
import { FaUsers, FaUser, FaSearch, FaChevronRight, FaChevronLeft } from "react-icons/fa"
import Image from "next/image"

export default function UsersPage() {
  const [users, setUsers] = useState<Stories.User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<Stories.User[]>([])
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

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
    setCurrentPage(1)
  }, [searchQuery, users])
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)


  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }


  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {

      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {

      pageNumbers.push(1)


      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, 4)
      }


      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3)
      }


      if (startPage > 2) {
        pageNumbers.push("...")
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...")
      }


      if (totalPages > 1) {
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

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
            <>
              <div className="space-y-4">
                {currentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100 transform hover:scale-[1.01]"
                  >
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center text-white text-lg font-medium overflow-hidden shadow-md">
                      {user.avatar ? (
                        <Image
                          src={user.avatar || "/placeholder.svg"}
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2 select-none">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                      }`}
                  >
                    <FaChevronRight className="text-sm" />
                  </button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => (typeof page === "number" ? goToPage(page) : null)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${page === currentPage
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium"
                            : page === "..."
                              ? "text-blue-600"
                              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                          }`}
                        disabled={page === "..."}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                      }`}
                  >
                    <FaChevronLeft className="text-sm" />
                  </button>
                </div>
              )}

              {/* Pagination Info */}
              <div className="mt-4 text-center text-sm text-blue-600">
                عرض {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredUsers.length)} من {filteredUsers.length}{" "}
                مستخدم
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end items-center gap-2">
        <span className="text-sm text-blue-600">عدد العناصر في الصفحة:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value))
            setCurrentPage(1)
          }}
          className="border border-blue-200 rounded-md px-2 py-1 text-sm text-blue-600 focus:outline-none focus:border-blue-400"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  )
}

