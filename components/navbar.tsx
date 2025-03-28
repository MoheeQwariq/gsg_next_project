"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()
    const navItems = [
        {
            name: "Dashboard",
            href: "/admin",
            emoji: "📊",
        },
        {
            name: "Users",
            href: "/admin/users",
            emoji: "👥",
        },
        {
            name: "Stories",
            href: "/admin/stories",
            emoji: "📚",
        }
    ]
    return (
        <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 sticky top-0 z-30 shadow-lg">
            <div className="max-w-7xl mx-auto flex h-16 items-center px-4">
                <Link href="/admin" className="font-bold text-xl mr-6 text-white flex items-center">
                    <span className="mr-2">🚀</span>
                    Admin Portal
                </Link>
                <div className="flex items-center space-x-2">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${pathname === item.href ? "bg-white text-indigo-700 shadow-md" : "text-white hover:bg-white/20"
                                    }`}
                            >
                                <span className="mr-2">{item.emoji}</span>
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}

