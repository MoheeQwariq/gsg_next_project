const profileArticlesStyles = {
  light: {
    container: "space-y-6",
    paginationContainer: "flex items-center justify-end gap-4 mt-4",
    pageButton: "px-3 py-1 rounded-md border border-gray-300",
    activePageButton: "bg-blue-600 text-white",
    inactivePageButton: "bg-white text-gray-700 hover:bg-gray-100",
    navButton: "px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100",
    navButtonDisabled: "opacity-50 cursor-not-allowed",
    skeletonCard: "animate-pulse bg-gray-100 p-4 rounded-lg",
    skeletonImage: "bg-gray-300 h-40 mb-2 rounded",
    skeletonText: "bg-gray-300 h-4 w-3/4 rounded",
    noArticlesCard: "bg-gray-100 border border-gray-300 p-4 rounded-lg text-center text-gray-600",
  },
  dark: {
    container: "space-y-6",
    paginationContainer: "flex items-center justify-end gap-4 mt-4",
    pageButton: "px-3 py-1 rounded-md border border-gray-700",
    activePageButton: "bg-blue-700 text-white",
    inactivePageButton: "bg-gray-800 text-gray-300 hover:bg-gray-700",
    navButton: "px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-700",
    navButtonDisabled: "opacity-50 cursor-not-allowed",
    skeletonCard: "animate-pulse bg-gray-800 p-4 rounded-lg",
    skeletonImage: "bg-gray-700 h-40 mb-2 rounded",
    skeletonText: "bg-gray-700 h-4 w-3/4 rounded",
    noArticlesCard: "bg-gray-800 border border-gray-700 p-4 rounded-lg text-center text-gray-300",
  },
};

export default profileArticlesStyles;
