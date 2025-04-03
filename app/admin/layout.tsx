import type React from "react"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"

export const metadata: Metadata = {
  title: "لوحة تحكم الإدارة",
  description: "لوحة تحكم إدارية مبنية بواسطة Next.js",
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-indigo-50">
          <Navbar />
          <main className="flex-1">
         {children}</main>
        </div>
      </body>
    </html>
  )
}

