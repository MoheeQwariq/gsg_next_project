"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { FaChartBar, FaUsers, FaBook, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa"
import Image from "next/image"
import myPhoto from "../../public/myPhoto.jpg"
import { CiLogout } from "react-icons/ci"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import NavLink from "./NavLink"

const AdminNavbar = () => {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    {
      name: "لوحة التحكم",
      href: "/admin",
      icon: <FaChartBar className="text-amber-400" />,
    },
    {
      name: "المستخدمون",
      href: "/admin/Users",
      icon: <FaUsers className="text-blue-400" />,
    },
    {
      name: "القصص",
      href: "/admin/stories",
      icon: <FaBook className="text-purple-500" />,
    },
  ]

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link href="/admin" className="font-bold text-xl text-white flex items-center">
            <span className="ml-2">🚀</span>
            <span>لوحة الأدمن</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1 space-x-reverse">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 mx-1 ${pathname === item.href ? "bg-white text-indigo-700 shadow-md" : "text-white hover:bg-white/20"
                    }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
            <button
              onClick={toggleLogin}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 mr-2 bg-white/10 hover:bg-white/20 text-white"
            >
              {isLoggedIn ? (
                <>
                  <FaSignOutAlt />
                  <span>تسجيل خروج</span>
                </>
              ) : (
                <>
                  <FaSignInAlt />
                  <span>تسجيل دخول</span>
                </>
              )}
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-indigo-700 pb-4 px-4">
          <div className="flex flex-col space-y-2 pt-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${pathname === item.href ? "bg-white text-indigo-700" : "text-white hover:bg-white/10"
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
            <button
              onClick={toggleLogin}
              className="px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white"
            >
              {isLoggedIn ? (
                <>
                  <FaSignOutAlt />
                  <span>تسجيل خروج</span>
                </>
              ) : (
                <>
                  <FaSignInAlt />
                  <span>تسجيل دخول</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

const GeneralNavbar = () => {
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-10 backdrop-blur-sm bg-[#EFEFEF]">
      <div className="container mx-auto flex items-center justify-between border-b border-gray-200 px-4 py-4 border-b-gray-900">
        <h1 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-[#7851E9] via-[#423ECD] to-[#3652E1] bg-clip-text text-transparent">
            حروف النازحين
          </span>
        </h1>


        <nav className="flex space-x-8 rtl:space-x-reverse">
          <NavLink href="/">الصفحة الرئيسية</NavLink>
          <NavLink href="/blogs">المقالات</NavLink>
        </nav>

        <div className="flex items-center gap-x-4">
          {isLoggedIn && (
            <div className="flex items-center gap-x-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={myPhoto}
                  alt="فيصل أبو زكري"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="hidden text-gray-800 font-medium md:inline-block">
                فيصل أبو زكري
              </span>
            </div>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-x-1.5 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              <span>تسجيل الخروج</span>
              <CiLogout className="h-4 w-4" />
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-x-1.5 rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              <span>تسجيل الدخول</span>
              <CiLogout className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

const Navbar = () => {
  const pathname = usePathname()

  if (pathname.startsWith("/admin")) {
    return <AdminNavbar />
  }

  return <GeneralNavbar />
}

export default Navbar
