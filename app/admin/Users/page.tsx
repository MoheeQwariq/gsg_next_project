"use client"

import type React from "react"

import { useEffect, useState, useCallback, useRef } from "react"
import { FaUsers, FaUser, FaSearch, FaChevronRight, FaChevronLeft } from "react-icons/fa"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"


interface ApiResponse {
  total: number
  page: number
  data: Stories.User[]
  description: string
}


export default function UsersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialSearch = searchParams.get("search") || ""
  const initialFilter = searchParams.get("filter") || ""
  const initialPage = Number.parseInt(searchParams.get("page") || "1")
  const initialPerPage = Number.parseInt(searchParams.get("perPage") || "5")
  const [users, setUsers] = useState<Stories.User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [searchInputValue, setSearchInputValue] = useState(initialSearch) 
  const [filter, setFilter] = useState(initialFilter)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [itemsPerPage, setItemsPerPage] = useState(initialPerPage)
  const [totalItems, setTotalItems] = useState(0)
  const [pageResetMessage, setPageResetMessage] = useState(false)

 
  const searchTimeout = useRef<NodeJS.Timeout | null>(null)

  const updateURL = useCallback(() => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    if (filter) params.set("filter", filter)
    if (currentPage !== 1) params.set("page", currentPage.toString())
    if (itemsPerPage !== 5) params.set("perPage", itemsPerPage.toString())

    const newURL = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`
    router.push(newURL, { scroll: false })
  }, [searchQuery, filter, currentPage, itemsPerPage, router])

  useEffect(() => {
    updateURL()
  }, [searchQuery, filter, currentPage, itemsPerPage, updateURL])
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      const queryParams = new URLSearchParams({
        search: searchQuery,
        filter: filter,
        page: currentPage.toString(),
        perPage: itemsPerPage.toString(),
      })

      const res = await fetch(`/api/users?${queryParams.toString()}`)

      if (!res.ok) {
        throw new Error(`خطأ في الاستجابة: ${res.status}`)
      }

      const data: ApiResponse = await res.json()
      setUsers(data.data)
      setTotalItems(data.total)
      setError(null)
    } catch (error) {
      console.error("Error fetching users:", error)
      setError("حدث خطأ أثناء جلب بيانات المستخدمين")
    } finally {
      setLoading(false)
    }
  }, [searchQuery, filter, currentPage, itemsPerPage]) 

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])  

  useEffect(() => {
    if (pageResetMessage) {
      const timer = setTimeout(() => {
        setPageResetMessage(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [pageResetMessage])

  const totalPages = Math.ceil(totalItems / itemsPerPage)

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

  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(startIndex + users.length - 1, totalItems)

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchInputValue(value)

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }

    searchTimeout.current = setTimeout(() => {
      if (currentPage > 1) {
        setPageResetMessage(true)
      }

      setSearchQuery(value)
      setCurrentPage(1)
    }, 500)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value

    if (currentPage > 1) {
      setPageResetMessage(true)
    }

    setFilter(value)
    setCurrentPage(1)
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
          {loading ? "..." : totalItems} مستخدم
        </span>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="ابحث عن مستخدم..."
            value={searchInputValue}
            onChange={handleSearchInputChange}
            className="w-full px-4 py-3 pr-10 border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-400 transition-all duration-200"
          />
          <span className="absolute left-3 top-3 text-blue-400">
            <FaSearch />
          </span>
        </div>
      </div>

      <div className="mb-6">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="px-4 py-3 border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-400 transition-all duration-200 w-48"
        >
          <option value="">جميع المستخدمين</option>
          <option value="admin">المشرفين</option>
          <option value="user">المستخدمين العاديين</option>
          <option value="guest">المستخدمون الزوار</option>

        </select>
      </div>

      {pageResetMessage && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4 flex items-center">
          <span>تم إعادة تعيين الصفحة إلى الصفحة الأولى بسبب تغيير معايير البحث أو التصفية.</span>
        </div>
      )}

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100">
        <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-cyan-50">
          <h2 className="font-semibold text-lg text-blue-800">قائمة المستخدمين</h2>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="space-y-6">
              {[...Array(itemsPerPage > 5 ? 5 : itemsPerPage)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-200 to-cyan-200 animate-pulse"></div>
                  <div className="space-y-3 flex-1">
                    <div className="h-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded animate-pulse w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">لا يوجد مستخدمين مطابقين لبحثك</div>
          ) : (
            <>
              <div className="space-y-4">
                {users.map((user) => (
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
                      {user.role || "مستخدم"}
                    </span>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2 select-none">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentPage === 1
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
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          page === currentPage
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
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                    }`}
                  >
                    <FaChevronLeft className="text-sm" />
                  </button>
                </div>
              )}

              <div className="mt-4 text-center text-sm text-blue-600">
                عرض {startIndex} - {endIndex} من {totalItems} مستخدم
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
            const newValue = Number(e.target.value)

          
            if (currentPage > 1) {
              setPageResetMessage(true)
            }

            setItemsPerPage(newValue)
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

