"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { FaChartBar, FaUsers, FaBook, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa"

export default function Navbar() {
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

