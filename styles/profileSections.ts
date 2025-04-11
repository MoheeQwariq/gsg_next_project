const profileSectionsStyles = {
  light: {
    container: "space-y-6",
    addButtonWrapper: "flex justify-end",
    addButton:
      "rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:from-blue-700 hover:to-indigo-700",
    sectionCard:
      "relative grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm",
    sectionImage: "relative h-64 w-full",
    sectionContent: "p-6 text-right flex flex-col justify-center",
    sectionHeader: "flex flex-row-reverse items-center justify-end gap-2",
    sectionTitle: "mb-2 text-xl font-bold text-gray-900 text-right",
    sectionText: "text-gray-600 text-right",
    emptyMessage: "text-center text-gray-500",
    skeletonCard: "animate-pulse bg-gray-100 p-4 rounded-lg",
    skeletonImage: "bg-gray-300 h-40 mb-2 rounded",
    skeletonText: "bg-gray-300 h-4 w-3/4 rounded",
    noSectionsCard:
      "rounded-xl border border-gray-200 bg-white shadow-sm p-8 text-center text-gray-600",
  },
  dark: {
    container: "space-y-6",
    addButtonWrapper: "flex justify-end",
    addButton:
      "rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:from-blue-700 hover:to-indigo-700",
    sectionCard:
      "relative grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-sm",
    sectionImage: "relative h-64 w-full",
    sectionContent: "p-6 text-right flex flex-col justify-center",
    sectionHeader: "flex flex-row-reverse items-center justify-end gap-2",
    sectionTitle: "mb-2 text-xl font-bold text-gray-100 text-right",
    sectionText: "text-gray-300 text-right",
    emptyMessage: "text-center text-gray-400",
    skeletonCard: "animate-pulse bg-gray-800 p-4 rounded-lg",
    skeletonImage: "bg-gray-700 h-40 mb-2 rounded",
    skeletonText: "bg-gray-700 h-4 w-3/4 rounded",
    noSectionsCard:
      "rounded-xl border border-gray-700 bg-gray-800 shadow-sm p-8 text-center text-gray-300",
  },
};

export default profileSectionsStyles;
