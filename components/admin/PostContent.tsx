"use client"

import { useState } from "react"

export default function PostContent({ content, postId }: { content: string; postId: string }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const maxLength = 150
  const shouldTruncate = content.length > maxLength
  const truncatedContent = shouldTruncate && !isExpanded ? content.substring(0, maxLength) + "..." : content

  return (
    <div className="mb-4">
      <p className="text-gray-600">{truncatedContent}</p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-purple-500 hover:text-purple-700 text-sm mt-1 focus:outline-none"
        >
          {isExpanded ? "عرض أقل" : "قراءة المزيد"}
        </button>
      )}
    </div>
  )
}

