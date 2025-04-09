const blogPageStyles = {
  light: {
      container: "min-h-screen font-sans bg-[rgb(235,235,235)] text-gray-900",
      header:
        "mb-6 flex flex-col justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center",
      title:
        "text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3652E1] to-[#8057F5]",
      content: "mb-8 space-y-6",
      blogsList: "space-y-6",
      skeleton: {
        search: "animate-pulse h-10 w-full bg-gray-200 rounded-lg mb-4",
        categories: "animate-pulse h-8 w-full bg-gray-200 rounded-lg mb-4",
        blog: "animate-pulse h-40 w-full bg-gray-200 rounded-lg mb-4",
      },
    },
  dark: {
      container: "min-h-screen font-sans bg-gray-900 text-gray-100",
      header:
        "mb-6 flex flex-col justify-between gap-4 border-b border-gray-700 pb-4 sm:flex-row sm:items-center",
      title:
        "text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400",
      content: "mb-8 space-y-6",
      blogsList: "space-y-6",
      skeleton: {
        search: "animate-pulse h-10 w-full bg-gray-700 rounded-lg mb-4",
        categories: "animate-pulse h-8 w-full bg-gray-700 rounded-lg mb-4",
        blog: "animate-pulse h-40 w-full bg-gray-700 rounded-lg mb-4",
      },
  },
};

export default blogPageStyles;
